import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditCompetitionGroupForm } from '@/modules/competition-groups/forms/edit'
import { useUpdateCompetitionGroup } from '@/modules/competition-groups/hooks'
import { CompetitionGroupDto } from '@/modules/competition-groups/types'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { getCompetitionGroupById } from '@/services/api/methods/competition-groups'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionGroupDto>(
  ['common', 'comp-groups'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionGroupById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditCompetitionGroupPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionGroupDto>) => {
  const { t } = useTranslation()

  const { mutate: updateCompGroup, isLoading: updateLoading } =
    useUpdateCompetitionGroup(data?.id || '')
  const { data: competitionsData, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: regionsData, isLoading: regionsLoading } = useRegionsList()

  const isLoading = competitionsLoading || regionsLoading || updateLoading

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-groups:EDIT_PAGE_TITLE')} />
      <EditCompetitionGroupForm
        current={data}
        onSubmit={updateCompGroup}
        competitionsData={competitionsData || []}
        regionsData={regionsData || []}
      />
    </>
  )
}

export default EditCompetitionGroupPage

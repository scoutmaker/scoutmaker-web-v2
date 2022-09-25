import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditCompetitionJuniorLevelForm } from '@/modules/competition-junior-levels/forms/edit'
import { useUpdateCompetitionJuniorLevel } from '@/modules/competition-junior-levels/hooks'
import { CompetitionJuniorLevelDto } from '@/modules/competition-junior-levels/types'
import { getCompetitionJuniorLevelById } from '@/services/api/methods/competition-junior-levels'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionJuniorLevelDto>(
  ['common', 'comp-junior-levels'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionJuniorLevelById(
        params?.id as string,
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditCompetitionJuniorLevelPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionJuniorLevelDto>) => {
  const { t } = useTranslation()

  const { mutate: updateCompJuniorLevel, isLoading: updateLoading } =
    useUpdateCompetitionJuniorLevel(data?.id || '')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('comp-junior-levels:EDIT_PAGE_TITLE')} />
      <EditCompetitionJuniorLevelForm
        current={data}
        onSubmit={updateCompJuniorLevel}
      />
    </>
  )
}

export default EditCompetitionJuniorLevelPage

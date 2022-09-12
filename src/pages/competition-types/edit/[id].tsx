import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditCompetitionTypeForm } from '@/modules/competition-types/forms/edit'
import { useUpdateCompetitionType } from '@/modules/competition-types/hooks'
import { CompetitionTypeDto } from '@/modules/competition-types/types'
import { getCompetitionTypeById } from '@/services/api/methods/competition-types'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionTypeDto>(
  ['common', 'competition-types'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionTypeById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditSeasonPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionTypeDto>) => {
  const { t } = useTranslation()

  const { mutate: updateCompType, isLoading: updateLoading } =
    useUpdateCompetitionType(data?.id || '')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('competition-types:EDIT_PAGE_TITLE')} />
      <EditCompetitionTypeForm current={data} onSubmit={updateCompType} />
    </>
  )
}

export default EditSeasonPage

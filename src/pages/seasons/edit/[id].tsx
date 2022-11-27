import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditSeasonForm } from '@/modules/seasons/forms/edit'
import { useUpdateSeason } from '@/modules/seasons/hooks'
import { SeasonDto } from '@/modules/seasons/types'
import { getSeasonById } from '@/services/api/methods/seasons'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<SeasonDto>(
  ['common', 'seasons'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getSeasonById(params?.id as string, token)
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
}: TSsrRole<SeasonDto>) => {
  const { t } = useTranslation()

  const { mutate: updateSeason, isLoading: updateLoading } = useUpdateSeason(
    data?.id || '',
  )

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('seasons:EDIT_PAGE_TITLE')} />
      <EditSeasonForm current={data} onSubmit={updateSeason} />
    </>
  )
}

export default EditSeasonPage

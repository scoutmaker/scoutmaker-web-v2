import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditReportBgImageForm } from '@/modules/report-background-images/forms/edit'
import { useUpdateReportBgImage } from '@/modules/report-background-images/hooks'
import { ReportBgImageDto } from '@/modules/report-background-images/types'
import { getReportBgImageById } from '@/services/api/methods/report-background-images'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<ReportBgImageDto>(['common', 'report-bg-images'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getReportBgImageById(
        +(params?.id as string),
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError
      }
    }
  });

const EditReportBgImagePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportBgImageDto>) => {
  const { t } = useTranslation()

  const { mutate: updateReportBgImg, isLoading: updateLoading } = useUpdateReportBgImage(
    data?.id || 0,
  )

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading
        title={t('report-bg-images:EDIT_PAGE_TITLE')}
      />
      <EditReportBgImageForm
        current={data}
        onSubmit={updateReportBgImg}
      />
    </>
  )
}

export default EditReportBgImagePage

import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ReportBgImageDetailsCard } from '@/modules/report-background-images/details-card'
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

const ReportBgImagePage = ({ data, errorMessage, errorStatus }: TSsrRole<ReportBgImageDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('REPORT_BACKGROUND_IMAGE')} />
      <ReportBgImageDetailsCard repbg={data} />
    </>
  )
}

export default ReportBgImagePage

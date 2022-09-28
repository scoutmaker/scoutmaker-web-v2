import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ReportDetails } from '@/modules/reports/details'
import { ReportDto } from '@/modules/reports/types'
import { getReportById } from '@/services/api/methods/reports'
import { ApiError } from '@/services/api/types'
import { getDocumentNumber } from '@/utils/get-document-number'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<ReportDto>(['common', 'reports'], false,
  async (token, params) => {
    try {
      const data = await getReportById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const ReportPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading
        title={t('reports:REPORT_PAGE_TITLE', {
          number: getDocumentNumber({
            docNumber: data.docNumber,
            createdAt: data.createdAt,
          }),
        })}
      />
      <ReportDetails report={data} />
    </>
  )
}

export default ReportPage

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { ReportDetails } from '@/modules/reports/details'
import { ReportDto } from '@/modules/reports/types'
import { getReportById } from '@/services/api/methods/reports'
import { ApiError } from '@/services/api/types'
import { getDocumentNumber } from '@/utils/get-document-number'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TReportPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  report: ReportDto | null
}

export const getServerSideProps = withSessionSsr<TReportPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          report: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'reports',
    ])

    let report: ReportDto

    try {
      const reportData = await getReportById(
        parseInt(params?.id as string),
        req.session.token,
      )
      report = reportData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          report: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        report,
      },
    }
  },
)

const ReportPage = ({
  report,
  errorMessage,
  errorStatus,
}: TReportPageProps) => {
  const { t } = useTranslation()

  if (report) {
    return (
      <>
        <PageHeading
          title={t('reports:REPORT_PAGE_TITLE', {
            number: getDocumentNumber({
              id: report.id,
              createdAt: report.createdAt,
            }),
          })}
        />
        <ReportDetails report={report} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default ReportPage

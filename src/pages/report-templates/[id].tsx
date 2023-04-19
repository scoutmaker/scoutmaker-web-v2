import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportSkillAssessmentCategoriesList } from '@/modules/report-skill-assessment-categories/hooks'
import { ReportTemplatesDetailsCard } from '@/modules/report-templates/details-card'
import { ReportTemplateDto } from '@/modules/report-templates/types'
import { getReportTemplateById } from '@/services/api/methods/report-templates'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<ReportTemplateDto>(
  ['common', 'report-templates'],
  false,
  async (token, params) => {
    try {
      const data = await getReportTemplateById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const ReportTemplatePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportTemplateDto>) => {
  const { t } = useTranslation()

  const { data: categories } = useReportSkillAssessmentCategoriesList()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('REPORT_TEMPLATE')} />
      <ReportTemplatesDetailsCard
        reportTemplate={data}
        categoriesData={categories || []}
      />
    </>
  )
}

export default ReportTemplatePage

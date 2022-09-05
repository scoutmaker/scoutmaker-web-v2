import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ReportSkillAssessmentTemplateDetailsCard } from '@/modules/report-skill-assessment-templates/details-card'
import { ReportSkillAssessmentTemplateDto } from '@/modules/report-skill-assessment-templates/types'
import { getReportSkillAssessmentTemplateById } from '@/services/api/methods/report-skill-assessment-templates'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<ReportSkillAssessmentTemplateDto>(['common', 'report-skill-assessment-templates'], false,
  async (token, params) => {
    try {
      const data = await getReportSkillAssessmentTemplateById(
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

const MatchPage = ({ data, errorMessage, errorStatus }: TSsrRole<ReportSkillAssessmentTemplateDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('REPORT_SKILL_ASSESSMENT_TEMPLATE')} />
      <ReportSkillAssessmentTemplateDetailsCard report={data} />
    </>
  )
}

export default MatchPage

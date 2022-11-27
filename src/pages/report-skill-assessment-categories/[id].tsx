import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ReportSkillAssessmentCategoryDetailsCard } from '@/modules/report-skill-assessment-categories/details-card'
import { ReportSkillAssessmentCategoryDto } from '@/modules/report-skill-assessment-categories/types'
import { getReportSkillAssessmentCategoryById } from '@/services/api/methods/report-skill-assessment-categories'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<ReportSkillAssessmentCategoryDto>(
    ['common', 'report-skill-assessment-categories'],
    false,
    async (token, params) => {
      try {
        const data = await getReportSkillAssessmentCategoryById(
          params?.id as string,
          token,
        )
        return { data }
      } catch (error) {
        return { data: null, error: error as ApiError }
      }
    },
  )

const ReportSkillAssessmentCategoryPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportSkillAssessmentCategoryDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('REPORT_SKILL_ASSESSMENT_CATEGORY')} />
      <ReportSkillAssessmentCategoryDetailsCard data={data} />
    </>
  )
}

export default ReportSkillAssessmentCategoryPage

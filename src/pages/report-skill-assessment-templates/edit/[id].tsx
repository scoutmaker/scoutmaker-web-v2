import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportSkillAssessmentCategoriesList } from '@/modules/report-skill-assessment-categories/hooks'
import { EditReportSkillAssessmentTemplateForm } from '@/modules/report-skill-assessment-templates/forms/edit'
import { useUpdateReportSkillAssessmentTemplate } from '@/modules/report-skill-assessment-templates/hooks'
import { ReportSkillAssessmentTemplateDto } from '@/modules/report-skill-assessment-templates/types'
import { getReportSkillAssessmentTemplateById } from '@/services/api/methods/report-skill-assessment-templates'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<ReportSkillAssessmentTemplateDto>(
    ['common', 'report-skill-assessment-templates'],
    false,
    async (token, params) => {
      try {
        const data = await getReportSkillAssessmentTemplateById(
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

const EditReportSkillAssessmentTemplatePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportSkillAssessmentTemplateDto>) => {
  const { t } = useTranslation()

  const { data: categories, isLoading: categoriesLoading } =
    useReportSkillAssessmentCategoriesList()
  const { mutate: updateReport, isLoading: updateReportLoading } =
    useUpdateReportSkillAssessmentTemplate(data?.id || '')

  const isLoading = updateReportLoading || categoriesLoading

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('report-skill-assessment-templates:EDIT_PAGE_TITLE')}
      />
      <EditReportSkillAssessmentTemplateForm
        current={data}
        onSubmit={updateReport}
        categoriesData={categories || []}
      />
    </>
  )
}

export default EditReportSkillAssessmentTemplatePage

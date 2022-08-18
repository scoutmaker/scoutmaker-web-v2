import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditReportSkillAssessmentCategoryForm } from '@/modules/report-skill-assessment-categories/forms/edit'
import { useUpdateReportSkillAssessmentCategory } from '@/modules/report-skill-assessment-categories/hooks'
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
          +(params?.id as string),
          token,
        )
        return { data }
      } catch (error) {
        return { data: null, error: error as ApiError }
      }
    },
  )

const EditReportSkillAssessmentCategoryPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportSkillAssessmentCategoryDto>) => {
  const { t } = useTranslation()

  const {
    mutate: updateReportSkillAssessmentCategory,
    isLoading: isUpdateLoading,
  } = useUpdateReportSkillAssessmentCategory(data?.id || 0)

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isUpdateLoading && <Loader />}
      <PageHeading
        title={t('report-skill-assessment-categories:EDIT_PAGE_TITLE')}
      />
      <EditReportSkillAssessmentCategoryForm
        current={data}
        onSubmit={updateReportSkillAssessmentCategory}
      />
    </>
  )
}

export default EditReportSkillAssessmentCategoryPage

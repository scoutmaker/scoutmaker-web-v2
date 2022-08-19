import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateReportSkillAssessmentCategoryForm } from '@/modules/report-skill-assessment-categories/forms/create'
import { useCreateReportSkillAssessmentCategory } from '@/modules/report-skill-assessment-categories/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'report-skill-assessment-categories'],
  false,
)

const CreateReportSkillAssessmentCategoryPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createReportSkillAssessmentCategory, isLoading } =
    useCreateReportSkillAssessmentCategory()

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('report-skill-assessments:CREATE_PAGE_TITLE')} />
      <CreateReportSkillAssessmentCategoryForm
        onSubmit={createReportSkillAssessmentCategory}
      />
    </>
  )
}

export default CreateReportSkillAssessmentCategoryPage

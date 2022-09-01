import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportSkillAssessmentCategoriesList } from '@/modules/report-skill-assessment-categories/hooks'
import { CreateReportSkillASsessmentTemplateForm } from '@/modules/report-skill-assessment-templates/forms/create'
import { useCreateReportSkillAssessmentTemplate } from '@/modules/report-skill-assessment-templates/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'report-skill-assessment-templates'], false)

const CreateReportSkillAssessmentTemplatePage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { data: categories, isLoading: categoriesLoading } = useReportSkillAssessmentCategoriesList()

  const { mutate: createReport, isLoading: createLoading } = useCreateReportSkillAssessmentTemplate()

  const isLoading =
    categoriesLoading ||
    createLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('report-skill-assessment-templates:CREATE_PAGE_TITLE')} />
      <CreateReportSkillASsessmentTemplateForm
        onSubmit={createReport}
        categoriesData={categories || []}
      />
    </>
  )
}

export default CreateReportSkillAssessmentTemplatePage

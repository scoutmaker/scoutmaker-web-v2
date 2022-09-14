import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportSkillAssessmentTemplatesList } from '@/modules/report-skill-assessment-templates/hooks'
import { CreateReportTemplateForm } from '@/modules/report-templates/forms/create'
import { useCreateReportTemplate } from '@/modules/report-templates/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'report-templates'], false)

const CreateReportTemplatePage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createReportTemplate, isLoading: createLoading } = useCreateReportTemplate()
  const { data: skillTemplates, isLoading: skillTemplatesLoading } = useReportSkillAssessmentTemplatesList()

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(createLoading || skillTemplatesLoading) && <Loader />}
      <PageHeading title={t('report-templates:CREATE_PAGE_TITLE')} />
      <CreateReportTemplateForm
        onSubmit={createReportTemplate}
        skillTemplatesData={skillTemplates || []}
      />
    </>
  )
}

export default CreateReportTemplatePage

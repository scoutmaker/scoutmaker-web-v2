import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportSkillAssessmentTemplatesList } from '@/modules/report-skill-assessment-templates/hooks'
import { EditReportTemplateForm } from '@/modules/report-templates/forms/edit'
import { useUpdateReportTemplate } from '@/modules/report-templates/hooks'
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

const EditReportTemplatePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportTemplateDto>) => {
  const { t } = useTranslation()

  const { mutate: updateReportTemplate, isLoading: updateLoading } =
    useUpdateReportTemplate(data?.id || '')
  const { data: skillTemplates, isLoading: skillTemplatesLoading } =
    useReportSkillAssessmentTemplatesList()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(updateLoading || skillTemplatesLoading) && <Loader />}
      <PageHeading title={t('report-templates:EDIT_PAGE_TITLE')} />
      <EditReportTemplateForm
        current={data}
        onSubmit={updateReportTemplate}
        skillTemplatesData={skillTemplates || []}
      />
    </>
  )
}

export default EditReportTemplatePage

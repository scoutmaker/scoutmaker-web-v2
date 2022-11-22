import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditOrganizationReportAclForm } from '@/modules/organization-report-acl/forms/edit'
import { useUpdateOrganizationReportAcl } from '@/modules/organization-report-acl/hooks'
import { OrganizationReportAclDto } from '@/modules/organization-report-acl/types'
import { getOrganizationReportAclById } from '@/services/api/methods/organization-report-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationReportAclDto>(
  ['common', 'organization-report-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationReportAclById(
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

const EditOrganizationReportAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationReportAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateOrganizationReportAcl, isLoading: updateLoading } =
    useUpdateOrganizationReportAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('organization-report-acl:EDIT_PAGE_TITLE')} />
      <EditOrganizationReportAclForm
        current={data}
        onSubmit={updateOrganizationReportAcl}
      />
    </>
  )
}

export default EditOrganizationReportAclPage

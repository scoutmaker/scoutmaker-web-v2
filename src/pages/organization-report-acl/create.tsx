import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateOrganizationReportAclForm } from '@/modules/organization-report-acl/forms/create'
import { useCreateOrganizationReportAcl } from '@/modules/organization-report-acl/hooks'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { useReportsList } from '@/modules/reports/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-report-acl', 'permissions'],
  ['ADMIN'],
)

const CreateOrganiztionReportAclPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createOrganizationReportAcl, isLoading: createLoading } =
    useCreateOrganizationReportAcl()

  const { data: reportsData, isLoading: reportsLoading } = useReportsList()
  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()

  const isLoading = reportsLoading || organizationsLoading || createLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-report-acl:CREATE_PAGE_TITLE')} />
      <CreateOrganizationReportAclForm
        onSubmit={createOrganizationReportAcl}
        organizationsData={organizationsData || []}
        reportsData={reportsData || []}
      />
    </>
  )
}

export default CreateOrganiztionReportAclPage

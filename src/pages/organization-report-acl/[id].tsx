import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationReportAclDetailsCard } from '@/modules/organization-report-acl/details-card'
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

const OrganizationReportAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationReportAclDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('ORGANIZATION_REPORT_ACE')} />
      <OrganizationReportAclDetailsCard data={data} />
    </>
  )
}

export default OrganizationReportAclPage

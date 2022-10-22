import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UserReportAclDetailsCard } from '@/modules/user-report-acl/details-card'
import { UserReportAclDto } from '@/modules/user-report-acl/types'
import { getUserReportAclById } from '@/services/api/methods/user-report-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserReportAclDto>(
  ['common', 'user-report-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserReportAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const UserReportAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserReportAclDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('USER_REPORT_ACE')} />
      <UserReportAclDetailsCard data={data} />
    </>
  )
}

export default UserReportAclPage

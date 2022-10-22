import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useReportsList } from '@/modules/reports/hooks'
import { CreateUserReportAclForm } from '@/modules/user-report-acl/forms/create'
import { useCreateUserReportAcl } from '@/modules/user-report-acl/hooks'
import { useUsersList } from '@/modules/users/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-report-acl', 'permissions'],
  ['ADMIN'],
)

const CreateUserReportAclPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createUserReportAcl, isLoading: createLoading } =
    useCreateUserReportAcl()

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: reportsData, isLoading: reportsLoading } = useReportsList()

  const isLoading = createLoading || usersLoading || reportsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-report-acl:CREATE_PAGE_TITLE')} />
      <CreateUserReportAclForm
        onSubmit={createUserReportAcl}
        usersData={usersData || []}
        reportsData={reportsData || []}
      />
    </>
  )
}

export default CreateUserReportAclPage

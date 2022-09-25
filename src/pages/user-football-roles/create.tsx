import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateUserFootballRoleForm } from '@/modules/user-football-roles/forms/create'
import { useCreateUserFootballRole } from '@/modules/user-football-roles/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-football-roles'],
  ['ADMIN'],
)

const CreateUserFootballRolePage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createRole, isLoading: createLoading } =
    useCreateUserFootballRole()

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {createLoading && <Loader />}
      <PageHeading title={t('user-football-roles:CREATE_PAGE_TITLE')} />
      <CreateUserFootballRoleForm onSubmit={createRole} />
    </>
  )
}

export default CreateUserFootballRolePage

import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { usePlayersList } from '@/modules/players/hooks'
import { CreateUserPlayerAclForm } from '@/modules/user-player-acl/forms/create'
import { useCreateUserPlayerAcl } from '@/modules/user-player-acl/hooks'
import { useUsersList } from '@/modules/users/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-player-acl', 'permissions'],
  ['ADMIN'],
)

const CreateUserPlayerPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createUserPlayerAcl, isLoading: createLoading } =
    useCreateUserPlayerAcl()

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const isLoading = createLoading || usersLoading || playersLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-player-acl:CREATE_PAGE_TITLE')} />
      <CreateUserPlayerAclForm
        onSubmit={createUserPlayerAcl}
        usersData={usersData || []}
        playersData={playersData || []}
      />
    </>
  )
}

export default CreateUserPlayerPage

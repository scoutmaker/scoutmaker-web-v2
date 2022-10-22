import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useNotesList } from '@/modules/notes/hooks'
import { CreateUserNoteAclForm } from '@/modules/user-note-acl/forms/create'
import { useCreateUserNoteAcl } from '@/modules/user-note-acl/hooks'
import { useUsersList } from '@/modules/users/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-note-acl', 'permissions'],
  ['ADMIN'],
)

const CreateUserNoteAclPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createUserNoteAcl, isLoading: createLoading } =
    useCreateUserNoteAcl()

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: notesData, isLoading: notesLoading } = useNotesList()

  const isLoading = usersLoading || notesLoading || createLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-note-acl:CREATE_PAGE_TITLE')} />
      <CreateUserNoteAclForm
        onSubmit={createUserNoteAcl}
        usersData={usersData || []}
        notesData={notesData || []}
      />
    </>
  )
}

export default CreateUserNoteAclPage

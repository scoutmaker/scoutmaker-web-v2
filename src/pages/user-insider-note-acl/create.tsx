import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useInsiderNotesList } from '@/modules/insider-notes/hooks'
import { CreateUserInsiderNoteAclForm } from '@/modules/user-insider-note-acl/forms/create'
import { useCreateUserInsiderNoteAcl } from '@/modules/user-insider-note-acl/hooks'
import { useUsersList } from '@/modules/users/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-insider-note-acl', 'permissions'],
  ['ADMIN'],
)

const CreateUserInsiderNoteAclPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createUserInsiderNoteAcl, isLoading: createLoading } =
    useCreateUserInsiderNoteAcl()

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: insiderNotesData, isLoading: insiderNotesLoading } =
    useInsiderNotesList()

  const isLoading = usersLoading || insiderNotesLoading || createLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-insider-note-acl:CREATE_PAGE_TITLE')} />
      <CreateUserInsiderNoteAclForm
        onSubmit={createUserInsiderNoteAcl}
        usersData={usersData || []}
        insiderNotesData={insiderNotesData || []}
      />
    </>
  )
}

export default CreateUserInsiderNoteAclPage

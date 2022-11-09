import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useNotesList } from '@/modules/notes/hooks'
import { CreateOrganizationNoteAclForm } from '@/modules/organization-note-acl/forms/create'
import { useCreateOrganizationNoteAcl } from '@/modules/organization-note-acl/hooks'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-note-acl', 'permissions'],
  ['ADMIN'],
)

const CreateOrganiztionNoteAclPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createOrganizationNoteAcl, isLoading: createLoading } =
    useCreateOrganizationNoteAcl()

  const { data: notesData, isLoading: notesLoading } = useNotesList()
  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()

  const isLoading = notesLoading || organizationsLoading || createLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-note-acl:CREATE_PAGE_TITLE')} />
      <CreateOrganizationNoteAclForm
        onSubmit={createOrganizationNoteAcl}
        notesData={notesData || []}
        organizationsData={organizationsData || []}
      />
    </>
  )
}

export default CreateOrganiztionNoteAclPage

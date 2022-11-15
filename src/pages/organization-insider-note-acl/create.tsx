import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useInsiderNotesList } from '@/modules/insider-notes/hooks'
import { CreateOrganizationInsiderNoteAclForm } from '@/modules/organization-insider-note-acl/forms/create'
import { useCreateOrganizationInsiderNoteAcl } from '@/modules/organization-insider-note-acl/hooks'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-insider-note-acl', 'permissions'],
  ['ADMIN'],
)

const CreateOrganiztionInsiderNoteAclPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createOrganizationInsiderNoteAcl, isLoading: createLoading } =
    useCreateOrganizationInsiderNoteAcl()

  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()
  const { data: insiderNotesData, isLoading: insiderNotesLoading } =
    useInsiderNotesList()

  const isLoading = organizationsLoading || insiderNotesLoading || createLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('organization-insider-note-acl:CREATE_PAGE_TITLE')}
      />
      <CreateOrganizationInsiderNoteAclForm
        onSubmit={createOrganizationInsiderNoteAcl}
        insiderNotesData={insiderNotesData || []}
        organizationsData={organizationsData || []}
      />
    </>
  )
}

export default CreateOrganiztionInsiderNoteAclPage

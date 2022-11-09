import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditOrganizationInsiderNoteAclForm } from '@/modules/organization-insider-note-acl/forms/edit'
import { useUpdateOrganizationInsiderNoteAcl } from '@/modules/organization-insider-note-acl/hooks'
import { OrganizationInsiderNoteAclDto } from '@/modules/organization-insider-note-acl/types'
import { getOrganizationInsiderNoteAclById } from '@/services/api/methods/organization-insider-note-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<OrganizationInsiderNoteAclDto>(
    ['common', 'organization-insider-note-acl', 'permissions'],
    ['ADMIN'],
    async (token, params) => {
      try {
        const data = await getOrganizationInsiderNoteAclById(
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

const EditOrganizationInsiderNoteAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationInsiderNoteAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateOrganizationInsiderNoteAcl, isLoading: updateLoading } =
    useUpdateOrganizationInsiderNoteAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('organization-insider-note-acl:EDIT_PAGE_TITLE')} />
      <EditOrganizationInsiderNoteAclForm
        current={data}
        onSubmit={updateOrganizationInsiderNoteAcl}
      />
    </>
  )
}

export default EditOrganizationInsiderNoteAclPage

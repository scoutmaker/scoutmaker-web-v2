import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditOrganizationNoteAclForm } from '@/modules/organization-note-acl/forms/edit'
import { useUpdateOrganizationNoteAcl } from '@/modules/organization-note-acl/hooks'
import { OrganizationNoteAclDto } from '@/modules/organization-note-acl/types'
import { getOrganizationNoteAclById } from '@/services/api/methods/organization-note-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationNoteAclDto>(
  ['common', 'organization-note-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationNoteAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditOrganizationNoteAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationNoteAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateOrganizationNoteAcl, isLoading: updateLoading } =
    useUpdateOrganizationNoteAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('organization-note-acl:EDIT_PAGE_TITLE')} />
      <EditOrganizationNoteAclForm
        current={data}
        onSubmit={updateOrganizationNoteAcl}
      />
    </>
  )
}

export default EditOrganizationNoteAclPage

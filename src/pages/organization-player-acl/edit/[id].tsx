import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditOrganizationPlayerAclForm } from '@/modules/organization-player-acl/forms/edit'
import { useUpdateOrganizationPlayerAcl } from '@/modules/organization-player-acl/hooks'
import { OrganizationPlayerAclDto } from '@/modules/organization-player-acl/types'
import { getOrganizationPlayerAclById } from '@/services/api/methods/organization-player-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationPlayerAclDto>(
  ['common', 'organization-player-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationPlayerAclById(
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

const EditOrganizationPlayerAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationPlayerAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateOrganizationPlayerAcl, isLoading: updateLoading } =
    useUpdateOrganizationPlayerAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('organization-player-acl:EDIT_PAGE_TITLE')} />
      <EditOrganizationPlayerAclForm
        current={data}
        onSubmit={updateOrganizationPlayerAcl}
      />
    </>
  )
}

export default EditOrganizationPlayerAclPage

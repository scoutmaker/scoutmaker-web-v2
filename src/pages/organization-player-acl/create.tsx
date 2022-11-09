import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateOrganizationPlayerAclForm } from '@/modules/organization-player-acl/forms/create'
import { useCreateOrganizationPlayerAcl } from '@/modules/organization-player-acl/hooks'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-player-acl', 'permissions'],
  ['ADMIN'],
)

const CreateOrganiztionPlayerAclPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createOrganizationPlayerAcl, isLoading: createLoading } =
    useCreateOrganizationPlayerAcl()

  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const isLoading = organizationsLoading || playersLoading || createLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-player-acl:CREATE_PAGE_TITLE')} />
      <CreateOrganizationPlayerAclForm
        onSubmit={createOrganizationPlayerAcl}
        organiztaionsData={organizationsData || []}
        playersData={playersData || []}
      />
    </>
  )
}

export default CreateOrganiztionPlayerAclPage

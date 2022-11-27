import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateOrganizationForm } from '@/modules/organizations/forms/create'
import { useCreateOrganization } from '@/modules/organizations/hooks'
import { useUsersList } from '@/modules/users/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organizations'],
  ['ADMIN'],
)

const CreateOrganiztionPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createOrganization, isLoading: createLoading } =
    useCreateOrganization()

  const { data: users, isLoading: usersLoading } = useUsersList()

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(createLoading || usersLoading) && <Loader />}
      <PageHeading title={t('organizations:CREATE_PAGE_TITLE')} />
      <CreateOrganizationForm
        onSubmit={createOrganization}
        usersData={users || []}
      />
    </>
  )
}

export default CreateOrganiztionPage

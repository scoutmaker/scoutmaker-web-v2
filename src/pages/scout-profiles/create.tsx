import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateScoutProfileForm } from '@/modules/scout-profile/forms/create'
import { useCreateScoutProfile } from '@/modules/scout-profile/hooks'
import { useUsersList } from '@/modules/users/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'scout-profiles'],
  ['ADMIN'],
)

const CreateScoutProfilePage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createProfile, isLoading: createLoading } =
    useCreateScoutProfile()

  const users = useUsersList()

  const isLoading = createLoading || users.isLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('scout-profiles:CREATE_PAGE_TITLE')} />
      <CreateScoutProfileForm
        onSubmit={createProfile}
        usersData={users.data || []}
      />
    </>
  )
}

export default CreateScoutProfilePage

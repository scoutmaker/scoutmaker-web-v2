import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { CreateUserSubscriptionForm } from '@/modules/user-subscriptions/forms/create'
import { useCreateUserSubscription } from '@/modules/user-subscriptions/hooks'
import { useUsersList } from '@/modules/users/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'user-subs'], ['ADMIN'])

const CreateUserSubscriptionPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createUserSub, isLoading: createLoading } = useCreateUserSubscription()

  const { data: compGroupsData, isLoading: compGroupsLoading } = useCompetitionGroupsList()
  const { data: compsData, isLoading: compsLoading } = useCompetitionsList()
  const { data: usersData, isLoading: usersLoading } = useUsersList()

  const isLoading = compGroupsLoading || compsLoading || usersLoading || createLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-subs:CREATE_PAGE_TITLE')} />
      <CreateUserSubscriptionForm
        onSubmit={createUserSub}
        competitionGroupsData={compGroupsData || []}
        competitionsData={compsData || []}
        usersData={usersData || []}
      />
    </>
  )
}

export default CreateUserSubscriptionPage

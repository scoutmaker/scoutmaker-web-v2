import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { EditUserSubscriptionForm } from '@/modules/user-subscriptions/forms/edit'
import { useUpdateUserSubscription } from '@/modules/user-subscriptions/hooks'
import { UserSubscriptionDto } from '@/modules/user-subscriptions/types'
import { getUserSubscriptionById } from '@/services/api/methods/user-subscriptions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserSubscriptionDto>(['common', 'user-subs'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserSubscriptionById(
        params?.id as string,
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError
      }
    }
  });

const EditUserSubscriptionPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserSubscriptionDto>) => {
  const { t } = useTranslation()

  const { mutate: updateUserSub, isLoading: updateLoading } = useUpdateUserSubscription(
    data?.id || '',
  )

  const { data: compGroupsData, isLoading: compGroupsLoading } = useCompetitionGroupsList()
  const { data: compsData, isLoading: compsLoading } = useCompetitionsList()

  const isLoading = compGroupsLoading || compsLoading || updateLoading

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('user-subs:EDIT_PAGE_TITLE')}
      />
      <EditUserSubscriptionForm
        current={data}
        onSubmit={updateUserSub}
        competitionGroupsData={compGroupsData || []}
        competitionsData={compsData || []}
      />
    </>
  )
}

export default EditUserSubscriptionPage

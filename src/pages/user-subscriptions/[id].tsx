import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UserSubscriptionDetailsCard } from '@/modules/user-subscriptions/details-card'
import { UserSubscriptionDto } from '@/modules/user-subscriptions/types'
import { getUserSubscriptionById } from '@/services/api/methods/user-subscriptions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserSubscriptionDto>(['common', 'user-subs'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserSubscriptionById(
        +(params?.id as string),
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

const UserSubscriptionPage = ({ data, errorMessage, errorStatus }: TSsrRole<UserSubscriptionDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('USER_SUBSCRIPTION')} />
      <UserSubscriptionDetailsCard userSub={data} />
    </>
  )
}

export default UserSubscriptionPage

import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationSubscriptionDetailsCard } from '@/modules/organization-subscriptions/details-card'
import { OrganizationSubscriptionDto } from '@/modules/organization-subscriptions/types'
import { getOrganizationSubscriptionById } from '@/services/api/methods/organization-subscriptions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<OrganizationSubscriptionDto>(
    ['common', 'organization-subs'],
    ['ADMIN'],
    async (token, params) => {
      try {
        const data = await getOrganizationSubscriptionById(
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

const OrganizationSubscriptionPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationSubscriptionDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('ORGANIZATION_SUBSCRIPTION')} />
      <OrganizationSubscriptionDetailsCard sub={data} />
    </>
  )
}

export default OrganizationSubscriptionPage

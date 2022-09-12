import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { EditOrganizationSubscriptionForm } from '@/modules/organization-subscriptions/forms/edit'
import { useUpdateOrganizationSubscription } from '@/modules/organization-subscriptions/hooks'
import { OrganizationSubscriptionDto } from '@/modules/organization-subscriptions/types'
import { getOrganizationSubscriptionById } from '@/services/api/methods/organization-subscriptions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationSubscriptionDto>(
  ['common', 'organization-subs'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationSubscriptionById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditOrganizationSubscriptionPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationSubscriptionDto>) => {
  const { t } = useTranslation()

  const { mutate: updateOrgSub, isLoading: updateLoading } = useUpdateOrganizationSubscription(
    data?.id || '',
  )

  const { data: compGroups, isLoading: compgroupsLoading } = useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } = useCompetitionsList()

  const isLoading = updateLoading || compgroupsLoading || competitionsLoading

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-subs:EDIT_PAGE_TITLE')} />
      <EditOrganizationSubscriptionForm
        current={data}
        onSubmit={updateOrgSub}
        competitionGroupsData={compGroups || []}
        competitionsData={competitions || []}
      />
    </>
  )
}

export default EditOrganizationSubscriptionPage

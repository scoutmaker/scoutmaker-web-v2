import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { CreateOrganizationSubscriptionForm } from '@/modules/organization-subscriptions/forms/create'
import { useCreateOrganizationSubscription } from '@/modules/organization-subscriptions/hooks'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-subs'],
  ['ADMIN'],
)

const CreateOrganizationSubscriptionPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createOrgSub, isLoading: createLoading } =
    useCreateOrganizationSubscription()

  const { data: organizations, isLoading: organizationsLoading } =
    useOrganizationsList()
  const { data: compGroups, isLoading: compgroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()

  const isLoading =
    createLoading ||
    organizationsLoading ||
    compgroupsLoading ||
    competitionsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-subs:CREATE_PAGE_TITLE')} />
      <CreateOrganizationSubscriptionForm
        onSubmit={createOrgSub}
        organizationsData={organizations || []}
        competitionGroupsData={compGroups || []}
        competitionsData={competitions || []}
      />
    </>
  )
}

export default CreateOrganizationSubscriptionPage

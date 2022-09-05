import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { usePlayersList } from '@/modules/players/hooks'
import { CreateTeamAffiliationForm } from '@/modules/team-affiliations/forms/create'
import { useCreateTeamAffiliation } from '@/modules/team-affiliations/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'team-affiliations'], ['ADMIN'])

const CreateTeamAffiliationPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { mutate: createTeamAffiliation, isLoading: createLoading } = useCreateTeamAffiliation()

  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const isLoading = playersLoading || teamsLoading || createLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('team-affiliations:CREATE_PAGE_TITLE')} />
      <CreateTeamAffiliationForm
        onSubmit={createTeamAffiliation}
        playersData={playersData || []}
        teamsData={teamsData || []}
        playerId={+(router.query?.playerId as string) || 0}
      />
    </>
  )
}

export default CreateTeamAffiliationPage

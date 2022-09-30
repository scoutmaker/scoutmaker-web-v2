import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useClubsList } from '@/modules/clubs/hooks'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { CreateTeamForm } from '@/modules/teams/forms/create'
import { useCreateTeam } from '@/modules/teams/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'teams'], false)

const CreateTeamPage = () => {
  const { t } = useTranslation()

  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()

  const { mutate: createTeam, isLoading: createTeamLoading } = useCreateTeam()

  const isLoading =
    createTeamLoading ||
    clubsLoading ||
    competitionsLoading ||
    competitionGroupsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('teams:CREATE_TEAM_PAGE_TITLE')} />
      <CreateTeamForm
        clubsData={clubs || []}
        competitionsData={competitions || []}
        competitionGroupsData={competitionGroups || []}
        onSubmit={createTeam}
      />
    </>
  )
}

export default CreateTeamPage

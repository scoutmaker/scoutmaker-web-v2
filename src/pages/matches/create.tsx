import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { CreateMatchForm } from '@/modules/matches/forms/create'
import { useCreateMatch } from '@/modules/matches/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'matches'], false)

const CreateMatchPage = () => {
  const { t } = useTranslation()

  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: seasons, isLoading: seasonsLoading } = useSeasonsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()

  const { mutate: createMatch, isLoading: createMatchLoading } =
    useCreateMatch()

  const isLoading =
    createMatchLoading ||
    competitionGroupsLoading ||
    competitionsLoading ||
    seasonsLoading ||
    teamsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('matches:CREATE_MATCH_PAGE_TITLE')} />
      <CreateMatchForm
        competitionGroupsData={competitionGroups || []}
        competitionsData={competitions || []}
        seasonsData={seasons || []}
        teamsData={teams || []}
        onSubmit={createMatch}
      />
    </>
  )
}

export default CreateMatchPage

import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useMatchesList } from '@/modules/matches/hooks'
import { CreatePlayerStatsForm } from '@/modules/player-stats/forms/create'
import { useCreatePlayerStats } from '@/modules/player-stats/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'player-stats'],
  false,
)

const CreatePlayerStatsPage = () => {
  const { t } = useTranslation()

  const { mutate: createPlayerStat, isLoading: createLoading } =
    useCreatePlayerStats()

  const { data: matchesData, isLoading: matchesLoading } = useMatchesList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const isLoading =
    createLoading || teamsLoading || playersLoading || matchesLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-stats:CREATE_PAGE_TITLE')} />
      <CreatePlayerStatsForm
        onSubmit={createPlayerStat}
        matchesData={matchesData || []}
        playersData={playersData || []}
        teamsData={teamsData || []}
      />
    </>
  )
}

export default CreatePlayerStatsPage

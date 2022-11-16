import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useMatchesList } from '@/modules/matches/hooks'
import { EditPlayerStatsForm } from '@/modules/player-stats/forms/edit'
import { useUpdatePlayerStats } from '@/modules/player-stats/hooks'
import { PlayerStatsDto } from '@/modules/player-stats/types'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { getPlayerStatsById } from '@/services/api/methods/player-stats'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerStatsDto>(
  ['common', 'player-stats'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getPlayerStatsById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditPlayerStatsPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerStatsDto>) => {
  const { t } = useTranslation()

  const { mutate: updatePlayerStat, isLoading: updateLoading } =
    useUpdatePlayerStats(data?.id || '0')

  const { data: matchesData, isLoading: matchesLoading } = useMatchesList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const isLoading =
    matchesLoading || playersLoading || teamsLoading || updateLoading

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-stats:EDIT_PAGE_TITLE')} />
      <EditPlayerStatsForm
        current={data}
        onSubmit={updatePlayerStat}
        matchesData={matchesData || []}
        playersData={playersData || []}
        teamsData={teamsData || []}
      />
    </>
  )
}

export default EditPlayerStatsPage

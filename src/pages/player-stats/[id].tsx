import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { PlayerStatsDetailsCard } from '@/modules/player-stats/details-card'
import { PlayerStatsDto } from '@/modules/player-stats/types'
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

const PlayerStatsPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerStatsDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('PLAYER_STATS')} />
      <PlayerStatsDetailsCard stats={data} />
    </>
  )
}

export default PlayerStatsPage

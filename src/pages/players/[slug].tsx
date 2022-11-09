import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { PlayerDetialsCard } from '@/modules/players/details-card'
import { PlayerDto } from '@/modules/players/types'
import { useTeamAffiliations } from '@/modules/team-affiliations/hooks'
import { TeamAffiliationsTable } from '@/modules/team-affiliations/table/team'
import { TeamAffiliationsSortBy } from '@/modules/team-affiliations/types'
import { getPlayerBySlug } from '@/services/api/methods/players'
import { ApiError } from '@/services/api/types'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

type TData = {
  isAdmin: boolean
  player: PlayerDto
}

export const getServerSideProps = withSessionSsrRole<TData>(
  ['common', 'players'],
  false,
  async (token, params, user) => {
    try {
      const data = await getPlayerBySlug(params?.slug as string, token)
      return { data: { isAdmin: !!user?.role.includes('ADMIN'), player: data } }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const PlayerPage = ({ data, errorMessage, errorStatus }: TSsrRole<TData>) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { isAdmin, player } = data || {}

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable(`team-affiliations-table-player:${player?.id}`, 'endDate')

  const { data: affiliations } = useTeamAffiliations({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as TeamAffiliationsSortBy,
    sortingOrder: order,
    playerId: player?.id || '',
  })

  if (!player)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={`${player.firstName} ${player.lastName}`} />
      <PlayerDetialsCard player={player} />
      <section>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginY: 3,
            gap: 1,
          }}
        >
          <Typography variant="h3" align="center">
            {t('players:TEAM_AFFILIATIONS_HEADING')}
          </Typography>
          {isAdmin && (
            <Button
              variant="contained"
              onClick={() =>
                router.push(`/team-affiliations/create?playerId=${player.id}`)
              }
            >
              {t('ADD')} <AddIcon />
            </Button>
          )}
        </Box>
        <TeamAffiliationsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={affiliations?.totalDocs || 0}
          data={affiliations?.docs || []}
        />
      </section>
    </>
  )
}

export default PlayerPage

import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PlayerDetialsCard } from '@/components/details-cards/player'
import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { TeamAffiliationsTableRow } from '@/components/tables/rows/team-affiliations-row'
import { TeamAffiliationsTable } from '@/components/tables/team-affiliations'
import { getPlayerBySlug } from '@/lib/players'
import { withSessionSsr } from '@/lib/session'
import { useTeamAffiliations } from '@/lib/team-affiliations'
import { ApiError } from '@/types/common'
import { PlayerDto } from '@/types/players'
import { TeamAffiliationsSortBy } from '@/types/team-affiliations'
import { useTable } from '@/utils/hooks/use-table'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TPlayerPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  player: PlayerDto | null
}

export const getServerSideProps = withSessionSsr<TPlayerPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          player: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'players',
    ])

    let player: PlayerDto

    try {
      const teamData = await getPlayerBySlug(
        params?.slug as string,
        req.session.token,
      )
      player = teamData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          player: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        player,
      },
    }
  },
)

const PlayerPage = ({
  player,
  errorMessage,
  errorStatus,
}: TPlayerPageProps) => {
  const { t } = useTranslation(['players'])

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
    playerId: player?.id,
  })

  if (!player) {
    return <ErrorContent message={errorMessage} status={errorStatus} />
  }

  return (
    <>
      <PageHeading title={`${player.firstName} ${player.lastName}`} />
      <PlayerDetialsCard player={player} />
      <section>
        <Typography variant="h3" align="center" sx={{ margin: 3 }}>
          {t('players:TEAM_AFFILIATIONS_HEADING')}
        </Typography>
        <TeamAffiliationsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={affiliations?.totalDocs || 0}
        >
          {affiliations
            ? affiliations.docs.map(affiliation => (
                <TeamAffiliationsTableRow
                  key={affiliation.id}
                  data={affiliation}
                />
              ))
            : null}
        </TeamAffiliationsTable>
      </section>
    </>
  )
}

export default PlayerPage

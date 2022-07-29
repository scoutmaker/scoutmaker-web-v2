import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TeamDetailsCard } from '@/components/details-cards/team'
import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionParticipationsTable } from '@/components/tables/competition-participations'
import { CompetitionParticipationsTableRow } from '@/components/tables/rows/competition-participations-row'
import { withSessionSsr } from '@/modules/auth/session'
import { useCompetitionParticipations } from '@/modules/competition-participations/hooks'
import { CompetitionParticipationsSortBy } from '@/modules/competition-participations/types'
import { TeamDto } from '@/modules/teams/types'
import { getTeamBySlug } from '@/services/api/methods/teams'
import { ApiError } from '@/types/common'
import { useTable } from '@/utils/hooks/use-table'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TTeamPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  team: TeamDto | null
}

export const getServerSideProps = withSessionSsr<TTeamPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          team: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'teams',
    ])

    let team: TeamDto

    try {
      const teamData = await getTeamBySlug(
        params?.slug as string,
        req.session.token,
      )
      team = teamData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          team: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        team,
      },
    }
  },
)

const TeamPage = ({ team, errorMessage, errorStatus }: TTeamPageProps) => {
  const { t } = useTranslation(['teams'])

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable(`competition-participations-table-team:${team?.id}`, 'seasonId')

  const { data: participations } = useCompetitionParticipations({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as CompetitionParticipationsSortBy,
    sortingOrder: order,
    teamId: team?.id,
  })

  if (!team) {
    return <ErrorContent message={errorMessage} status={errorStatus} />
  }

  return (
    <>
      <PageHeading title={team.name} />
      <TeamDetailsCard team={team} />
      <section>
        <Typography variant="h3" align="center" sx={{ margin: 3 }}>
          {t('teams:COMPETITION_PARTICIPATIONS_HEADING')}
        </Typography>
        <CompetitionParticipationsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={participations?.totalDocs || 0}
        >
          {participations
            ? participations.docs.map(participation => (
                <CompetitionParticipationsTableRow
                  key={team.id}
                  data={participation}
                />
              ))
            : null}
        </CompetitionParticipationsTable>
      </section>
    </>
  )
}

export default TeamPage

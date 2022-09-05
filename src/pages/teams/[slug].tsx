import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useCompetitionParticipations } from '@/modules/competition-participations/hooks'
import { CompetitionParticipationsTableRow } from '@/modules/competition-participations/table/row'
import { CompetitionParticipationsTable } from '@/modules/competition-participations/table/table'
import { CompetitionParticipationsSortBy } from '@/modules/competition-participations/types'
import { TeamDetailsCard } from '@/modules/teams/details-card'
import { TeamDto } from '@/modules/teams/types'
import { getTeamBySlug } from '@/services/api/methods/teams'
import { ApiError } from '@/services/api/types'
import { useTable } from '@/utils/hooks/use-table'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TTeamPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  team: TeamDto | null
  isAdmin: boolean
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
          isAdmin: false
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
          isAdmin: false
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        team,
        isAdmin: user.role === 'ADMIN'
      },
    }
  },
)

const TeamPage = ({ team, errorMessage, errorStatus, isAdmin }: TTeamPageProps) => {
  const { t } = useTranslation()
  const router = useRouter()

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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginY: 3, gap: 1 }} >
          <Typography variant="h3" align="center">
            {t('teams:COMPETITION_PARTICIPATIONS_HEADING')}
          </Typography>
          {isAdmin &&
            <Button variant='contained' onClick={() => router.push(`/competition-participations/create/${team.id}`)}>{t('ADD')} <AddIcon /></Button>
          }
        </Box>
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
          {!!participations
            && participations.docs.map(participation => (
              <CompetitionParticipationsTableRow
                key={team.id}
                data={participation}
                isDeleteOptionEnabled={false}
                isEditOptionEnabled={false}
                onDeleteClick={() => { }}
                onEditClick={() => { }}
              />
            ))}
        </CompetitionParticipationsTable>
      </section>
    </>
  )
}

export default TeamPage

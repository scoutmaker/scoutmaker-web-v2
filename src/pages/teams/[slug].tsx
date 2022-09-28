import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionParticipations } from '@/modules/competition-participations/hooks'
import { CompetitionParticipationsTableRow } from '@/modules/competition-participations/table/row'
import { CompetitionParticipationsTable } from '@/modules/competition-participations/table/table'
import { CompetitionParticipationsSortBy } from '@/modules/competition-participations/types'
import { TeamDetailsCard } from '@/modules/teams/details-card'
import { TeamDto } from '@/modules/teams/types'
import { getTeamBySlug } from '@/services/api/methods/teams'
import { ApiError } from '@/services/api/types'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

interface TTeamPageProps {
  team: TeamDto
  isAdmin: boolean
}

export const getServerSideProps = withSessionSsrRole<TTeamPageProps>(['common', 'teams'], false,
  async (token, params, user) => {
    try {
      const team = await getTeamBySlug(
        params?.slug as string,
        token,
      )
      return { data: { team, isAdmin: user?.role === 'ADMIN' } }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const TeamPage = ({ errorMessage, errorStatus, data }: TSsrRole<TTeamPageProps>) => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable(`competition-participations-table-team:${data?.team.id}`, 'seasonId')

  const { data: participations } = useCompetitionParticipations({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as CompetitionParticipationsSortBy,
    sortingOrder: order,
    teamId: data?.team.id,
  })

  if (!data?.team) {
    return <ErrorContent message={errorMessage} status={errorStatus} />
  }
  const { team, isAdmin } = data
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
            <Button variant='contained' onClick={() => router.push(`/competition-participations/create?teamId=${team.id}`)}>{t('ADD')} <AddIcon /></Button>
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

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ClubDetailsCard } from '@/modules/clubs/details-card'
import { ClubDto } from '@/modules/clubs/types'
import { useLikeTeam, useTeams, useUnlikeTeam } from '@/modules/teams/hooks'
import { TeamsTable } from '@/modules/teams/table/teams'
import { getClubBySlug } from '@/services/api/methods/clubs'
import { ApiError } from '@/services/api/types'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

export const getServerSideProps = withSessionSsrRole<ClubDto>(
  ['common', 'clubs'],
  false,
  async (token, params) => {
    try {
      const data = await getClubBySlug(params?.slug as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const ClubPage = ({ data, errorMessage, errorStatus }: TSsrRole<ClubDto>) => {
  const { t } = useTranslation()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable(`club-teams-table`)

  const { data: teamsData, isLoading: teamsLoading } = useTeams({
    clubId: data?.id || ''
  })
  const { mutate: likeTeam, isLoading: likeTeamLoading } = useLikeTeam()
  const { mutate: unLikeTeam, isLoading: unLikeTeamLoading } = useUnlikeTeam()

  const isLoading = teamsLoading || likeTeamLoading || unLikeTeamLoading

  if (data) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading title={data.name} />
        <ClubDetailsCard club={data} />
        <Typography variant="h3" align="center" paddingY={theme => theme.spacing(2.2)}>
          {t('TEAMS')}
        </Typography>
        <TeamsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={teamsData?.totalDocs || 0}
          data={teamsData?.docs || []}
          onUnLikeClick={unLikeTeam}
          onLikeClick={likeTeam}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default ClubPage

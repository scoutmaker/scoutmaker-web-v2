import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { EditMatchForm } from '@/modules/matches/forms/edit'
import { useUpdateMatch } from '@/modules/matches/hooks'
import { MatchDto } from '@/modules/matches/types'
import { getMatchDisplayName } from '@/modules/matches/utils'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { getMatchById } from '@/services/api/methods/matches'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<MatchDto>(
  ['common', 'matches'],
  false,
  async (token, params) => {
    try {
      const data = await getMatchById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const EditMatchPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<MatchDto>) => {
  const { t } = useTranslation()

  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: seasons, isLoading: seasonsLoading } = useSeasonsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()

  const { mutate: updateMatch, isLoading: updateMatchLoading } = useUpdateMatch(
    data?.id || '',
  )

  const isLoading =
    updateMatchLoading ||
    competitionGroupsLoading ||
    competitionsLoading ||
    seasonsLoading ||
    teamsLoading

  if (data) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading
          title={t('players:EDIT_PLAYER_PAGE_TITLE', {
            name: getMatchDisplayName({
              homeTeamName: data.homeTeam.name,
              awayTeamName: data.awayTeam.name,
            }),
          })}
        />
        <EditMatchForm
          current={data}
          competitionGroupsData={competitionGroups || []}
          competitionsData={competitions || []}
          seasonsData={seasons || []}
          teamsData={teams || []}
          onSubmit={updateMatch}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditMatchPage

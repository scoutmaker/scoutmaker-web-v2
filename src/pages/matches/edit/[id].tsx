import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
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
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditMatchPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  match: MatchDto | null
}

export const getServerSideProps = withSessionSsr<TEditMatchPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          match: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'matches',
    ])

    let match: MatchDto

    try {
      const matchData = await getMatchById(
        params?.id as string,
        req.session.token,
      )
      match = matchData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          match: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        match,
      },
    }
  },
)

const EditMatchPage = ({
  match,
  errorMessage,
  errorStatus,
}: TEditMatchPageProps) => {
  const { t } = useTranslation()

  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: seasons, isLoading: seasonsLoading } = useSeasonsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()

  const { mutate: updateMatch, isLoading: updateMatchLoading } = useUpdateMatch(
    match?.id || '',
  )

  const isLoading =
    updateMatchLoading ||
    competitionGroupsLoading ||
    competitionsLoading ||
    seasonsLoading ||
    teamsLoading

  if (match) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading
          title={t('players:EDIT_PLAYER_PAGE_TITLE', {
            name: getMatchDisplayName({
              homeTeamName: match.homeTeam.name,
              awayTeamName: match.awayTeam.name,
            }),
          })}
        />
        <EditMatchForm
          current={match}
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

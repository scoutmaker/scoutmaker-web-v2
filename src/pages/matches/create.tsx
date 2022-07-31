import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { CreateMatchForm } from '@/modules/matches/forms/create'
import { useCreateMatch } from '@/modules/matches/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'matches',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const CreateMatchPage = () => {
  const { t } = useTranslation()

  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: seasons, isLoading: seasonsLoading } = useSeasonsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()

  const { mutate: createMatch, isLoading: createMatchLoading } =
    useCreateMatch()

  const isLoading =
    createMatchLoading ||
    competitionGroupsLoading ||
    competitionsLoading ||
    seasonsLoading ||
    teamsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('matches:CREATE_MATCH_PAGE_TITLE')} />
      <CreateMatchForm
        competitionGroupsData={competitionGroups || []}
        competitionsData={competitions || []}
        seasonsData={seasons || []}
        teamsData={teams || []}
        onSubmit={createMatch}
      />
    </>
  )
}

export default CreateMatchPage

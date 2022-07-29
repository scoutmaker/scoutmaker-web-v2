import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CreateTeamForm } from '@/components/forms/team/create-team'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useClubsList } from '@/modules/clubs/hooks'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useCreateTeam } from '@/modules/teams/hooks'
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
      'teams',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const CreateTeamPage = () => {
  const { t } = useTranslation()

  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()

  const { mutate: createTeam, isLoading: createTeamLoading } = useCreateTeam()

  const isLoading =
    createTeamLoading ||
    clubsLoading ||
    competitionsLoading ||
    competitionGroupsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('teams:CREATE_TEAM_PAGE_TITLE')} />
      <CreateTeamForm
        clubsData={clubs || []}
        competitionsData={competitions || []}
        competitionGroupsData={competitionGroups || []}
        onSubmit={createTeam}
      />
    </>
  )
}

export default CreateTeamPage

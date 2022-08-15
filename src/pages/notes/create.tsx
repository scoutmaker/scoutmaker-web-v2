import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useMatchesList } from '@/modules/matches/hooks'
import { CreateNoteForm } from '@/modules/notes/forms/create'
import { useCreateNote } from '@/modules/notes/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
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
      'notes',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const CreateNotePage = () => {
  const { t } = useTranslation()

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { data: players, isLoading: playersLoading } = usePlayersList()

  const { mutate: createNote, isLoading: createNoteLoading } = useCreateNote()

  const isLoading =
    positionsLoading ||
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    matchesLoading ||
    playersLoading ||
    createNoteLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('notes:CREATE_NOTE_PAGE_TITLE')} />
      <CreateNoteForm
        positionsData={positions || []}
        teamsData={teams || []}
        competitionGroupsData={competitionGroups || []}
        competitionsData={competitions || []}
        matchesData={matches || []}
        playersData={players || []}
        onSubmit={createNote}
      />
    </>
  )
}

export default CreateNotePage

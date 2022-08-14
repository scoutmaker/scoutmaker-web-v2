import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useMatchesList } from '@/modules/matches/hooks'
import { EditNoteForm } from '@/modules/notes/forms/edit'
import { useUpdateNote } from '@/modules/notes/hooks'
import { NoteDto } from '@/modules/notes/types'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { getNoteById } from '@/services/api/methods/notes'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditNotePageProps = {
  errorStatus: number | null
  errorMessage: string | null
  note: NoteDto | null
}

export const getServerSideProps = withSessionSsr<TEditNotePageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          note: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'notes',
    ])

    let note: NoteDto

    try {
      const noteData = await getNoteById(
        parseInt(params?.id as string),
        req.session.token,
      )
      note = noteData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          note: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        note,
      },
    }
  },
)

const EditNotePage = ({
  note,
  errorMessage,
  errorStatus,
}: TEditNotePageProps) => {
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

  const { mutate: updateNote, isLoading: updateNoteLoading } = useUpdateNote(
    note?.id || 0,
  )

  const isLoading =
    positionsLoading ||
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    matchesLoading ||
    playersLoading ||
    updateNoteLoading

  if (note) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading
          title={t('notes:EDIT_NOTE_PAGE_TITLE', {
            name: note.id,
          })}
        />
        <EditNoteForm
          current={note}
          positionsData={positions || []}
          teamsData={teams || []}
          competitionGroupsData={competitionGroups || []}
          competitionsData={competitions || []}
          matchesData={matches || []}
          playersData={players || []}
          onSubmit={updateNote}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditNotePage

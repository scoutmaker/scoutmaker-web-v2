import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useMatchesList } from '@/modules/matches/hooks'
import { EditNoteForm } from '@/modules/notes/forms/edit'
import { useNotesList, useUpdateNote } from '@/modules/notes/hooks'
import { NoteDto } from '@/modules/notes/types'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { getNoteById } from '@/services/api/methods/notes'
import { ApiError } from '@/services/api/types'
import { getDocumentNumber } from '@/utils/get-document-number'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<NoteDto>(
  ['common', 'notes'],
  false,
  async (token, params) => {
    try {
      const data = await getNoteById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const EditNotePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<NoteDto>) => {
  const { t } = useTranslation()
  const router = useRouter()
  const matchId = (router.query?.quickMatchId || '') as string

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { data: players, isLoading: playersLoading } = usePlayersList()

  const { mutate: updateNote, isLoading: updateNoteLoading } = useUpdateNote(
    data?.id || '',
  )

  const { data: notesList, isLoading: notesLoading } = useNotesList(
    { matchIds: [matchId] },
    !!matchId,
  )

  const isLoading =
    positionsLoading ||
    matchesLoading ||
    playersLoading ||
    updateNoteLoading ||
    notesLoading

  if (data) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading
          title={t('notes:EDIT_NOTE_PAGE_TITLE', {
            number: getDocumentNumber({
              docNumber: data.docNumber,
              createdAt: data.createdAt,
            }),
          })}
        />
        <EditNoteForm
          current={data}
          positionsData={positions || []}
          matchesData={matches || []}
          playersData={players || []}
          onSubmit={updateNote}
          notesData={notesList || []}
          quickMatchId={matchId}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditNotePage

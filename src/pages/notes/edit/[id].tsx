import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
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
import { getDocumentNumber } from '@/utils/get-document-number'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<NoteDto>(['common', 'notes'], false,
  async (token, params) => {
    try {
      const data = await getNoteById(
        params?.id as string,
        token
      )
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const EditNotePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<NoteDto>) => {
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
    data?.id || '',
  )

  const isLoading =
    positionsLoading ||
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    matchesLoading ||
    playersLoading ||
    updateNoteLoading

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

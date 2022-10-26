import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useActiveMatchAttendance } from '@/modules/match-attendances/hooks'
import { useMatchesList } from '@/modules/matches/hooks'
import { CreateNoteForm } from '@/modules/notes/forms/create'
import { useCreateNote } from '@/modules/notes/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayers } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'notes'], false)

const CreateNotePage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const useMatchAttendanceEnabled = router.query?.useMatchAttendance === 'true'

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()

  const { mutate: createNote, isLoading: createNoteLoading } = useCreateNote()

  const { data: activeMatchAttendance, isLoading: matchAttendanceLoading } =
    useActiveMatchAttendance(useMatchAttendanceEnabled)

  const { data: players, isLoading: playersLoading } = usePlayers({
    teamIds:
      useMatchAttendanceEnabled && activeMatchAttendance
        ? [
            activeMatchAttendance.match.homeTeam.id,
            activeMatchAttendance.match.awayTeam.id,
          ]
        : undefined,
  })

  const isLoading =
    positionsLoading ||
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    matchesLoading ||
    playersLoading ||
    createNoteLoading ||
    matchAttendanceLoading

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
        playersData={players?.docs || []}
        onSubmit={createNote}
        matchAttendance={
          useMatchAttendanceEnabled ? activeMatchAttendance : undefined
        }
      />
    </>
  )
}

export default CreateNotePage

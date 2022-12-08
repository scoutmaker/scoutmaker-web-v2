import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useMatchById, useMatchesList } from '@/modules/matches/hooks'
import { CreateNoteForm } from '@/modules/notes/forms/create'
import { useCreateNote } from '@/modules/notes/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { useConfirmOnLeavePage } from '@/utils/hooks/use-confirm-leave'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'notes'], false)

const CreateNotePage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const matchId = (router.query?.matchId || '') as string

  let observationType: 'LIVE' | 'VIDEO' | undefined
  const routerObservationType = router.query?.observationType
  if (routerObservationType === 'LIVE' || routerObservationType === 'VIDEO')
    observationType = routerObservationType

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()

  const { mutate: createNote, isLoading: createNoteLoading } = useCreateNote()

  const { data: match, isLoading: matchLoading } = useMatchById(
    matchId as string,
    !!matchId,
  )

  const { data: players, isLoading: playersLoading } = usePlayersList({
    teamIds:
      matchId && match ? [match.homeTeam.id, match.awayTeam.id] : undefined,
  })

  useConfirmOnLeavePage(t)

  const isLoading =
    positionsLoading ||
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    matchesLoading ||
    playersLoading ||
    createNoteLoading ||
    (matchId && matchLoading)

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
        match={matchId && match ? match : undefined}
        observationType={observationType}
      />
    </>
  )
}

export default CreateNotePage

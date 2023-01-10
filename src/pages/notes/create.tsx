import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useMatchById, useMatchesList } from '@/modules/matches/hooks'
import { CreateNoteForm } from '@/modules/notes/forms/create'
import { useCreateNote } from '@/modules/notes/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
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

  const isLoading =
    positionsLoading ||
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

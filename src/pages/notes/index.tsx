import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { MatchesFilterForm } from '@/modules/matches/forms/filter'
import {
  useDeleteMatch,
  useMatches,
  useMatchesList,
} from '@/modules/matches/hooks'
import { MatchesTableRow } from '@/modules/matches/table/row'
import { MatchesTable } from '@/modules/matches/table/table'
import { MatchesFiltersDto, MatchesSortBy } from '@/modules/matches/types'
import { NotesFilterForm } from '@/modules/notes/forms/filter'
import {
  useDeleteNote,
  useLikeNote,
  useNotes,
  useUnlikeNote,
} from '@/modules/notes/hooks'
import { NotesTableRow } from '@/modules/notes/table/row'
import { NotesTable } from '@/modules/notes/table/table'
import { NotesFiltersDto, NotesSortBy } from '@/modules/notes/types'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(
  async ({ locale, req, res }) => {
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

const initialFilters: NotesFiltersDto = {
  competitionGroupIds: [],
  competitionIds: [],
  isLiked: false,
  matchIds: [],
  percentageRatingRangeEnd: 100,
  percentageRatingRangeStart: 0,
  playerBornAfter: 1980,
  playerBornBefore: 2005,
  playerIds: [],
  positionIds: [],
  teamIds: [],
}

interface INoteToDeleteData {
  id: number
}

const NotesPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [noteToDeleteData, setNoteToDeleteData] =
    useState<INoteToDeleteData | null>(null)

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('notes-table')

  const [filters, setFilters] = useLocalStorage<NotesFiltersDto>({
    key: 'notes-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: NotesFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { data: players, isLoading: playersLoading } = usePlayersList()
  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()

  const { data: notes, isLoading: notesLoading } = useNotes({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as NotesSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteNote, isLoading: deleteNoteLoading } = useDeleteNote()
  const { mutate: likeNote, isLoading: likeNoteLoading } = useLikeNote()
  const { mutate: unlikeNote, isLoading: unlikeNoteLoading } = useUnlikeNote()

  const isLoading =
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    notesLoading ||
    deleteNoteLoading ||
    matchesLoading ||
    playersLoading ||
    positionsLoading ||
    likeNoteLoading ||
    unlikeNoteLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('notes:INDEX_PAGE_TITLE')} />
      <NotesFilterForm
        filters={filters}
        matchesData={matches || []}
        playersData={players || []}
        positionsData={positions || []}
        teamsData={teams || []}
        competitionsData={competitions || []}
        competitionGroupsData={competitionGroups || []}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <NotesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={notes?.totalDocs || 0}
        actions
      >
        {notes
          ? notes.docs.map(note => (
              <NotesTableRow
                key={note.id}
                data={note}
                onEditClick={() => {
                  router.push(`/notes/edit/${note.id}`)
                }}
                onDeleteClick={() => {
                  setNoteToDeleteData({ id: note.id })
                  setIsDeleteConfirmationModalOpen(true)
                }}
                onLikeClick={(id: number) => likeNote(id)}
                onUnlikeClick={(id: number) => unlikeNote(id)}
                isEditOptionEnabled
                isDeleteOptionEnabled
              />
            ))
          : null}
      </NotesTable>
      <Fab href="/notes/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('matches:DELETE_NOTE_CONFIRM_QUESTION', {
          name: noteToDeleteData?.id,
        })}
        handleAccept={() => {
          if (noteToDeleteData) {
            deleteNote(noteToDeleteData.id)
          }
          setNoteToDeleteData(null)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setNoteToDeleteData(null)
        }}
      />
    </>
  )
}

export default NotesPage

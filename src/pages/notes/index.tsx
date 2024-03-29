import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useMatchesList } from '@/modules/matches/hooks'
import { NotesFilterForm } from '@/modules/notes/forms/filter'
import { useDeleteNote, useNotes, useUnlikeNote } from '@/modules/notes/hooks'
import { NotesTable } from '@/modules/notes/table/table'
import { NotesFiltersState, NotesSortBy } from '@/modules/notes/types'
import { useOnLikeNoteClick } from '@/modules/notes/utils'
import { usePlayerPositionTypesList } from '@/modules/player-position-types/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { getDocumentNumber } from '@/utils/get-document-number'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'notes'], false)

const initialFilters: NotesFiltersState = {
  competitionGroupIds: [],
  competitionIds: [],
  isLiked: false,
  matchIds: [],
  playerBornAfter: '',
  playerBornBefore: '',
  playerIds: [],
  positionIds: [],
  positionTypeIds: [],
  teamIds: [],
  observationType: null,
  onlyLikedPlayers: false,
  onlyLikedTeams: false,
  percentageRatingRanges: [],
  seasonIds: [],
  onlyMine: false,
}

const initialSortBy: NotesSortBy = 'percentageRating_createdAt'

interface INoteToDeleteData {
  id: string
  docNumber: number
  createdAt: string
}

const NotesPage = () => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [noteToDeleteData, setNoteToDeleteData] = useState<INoteToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('notes-table', initialSortBy)

  const [filters, setFilters] = useLocalStorage<NotesFiltersState>({
    key: 'notes-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: NotesFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: teams, isLoading: teamsLoading } = useTeamsList({
    isLiked: filters.onlyLikedTeams,
  })
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { data: players, isLoading: playersLoading } = usePlayersList({
    isLiked: filters.onlyLikedPlayers,
  })
  const { data: positionTypes, isLoading: positionTypesLoading } =
    usePlayerPositionTypesList()
  const { data: seasons, isLoading: seasonsLoading } = useSeasonsList()

  const { data: notes, isLoading: notesLoading } = useNotes({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as NotesSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { mutate: deleteNote, isLoading: deleteNoteLoading } = useDeleteNote()
  const { mutate: unlikeNote, isLoading: unlikeNoteLoading } = useUnlikeNote()
  const { likeNote, likeNoteLoading } = useOnLikeNoteClick()

  const handleDeleteItemClick = (data: INoteToDeleteData) => {
    setNoteToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const onClearFilters = () => {
    handleSetFilters(initialFilters)
    handleSort(initialSortBy, 'desc')
  }

  const isLoading =
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    notesLoading ||
    deleteNoteLoading ||
    matchesLoading ||
    playersLoading ||
    likeNoteLoading ||
    unlikeNoteLoading ||
    likeNoteLoading ||
    positionTypesLoading ||
    seasonsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('notes:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <NotesFilterForm
          filters={filters}
          matchesData={matches || []}
          playersData={players || []}
          positionTypesData={positionTypes || []}
          teamsData={teams || []}
          competitionsData={competitions || []}
          competitionGroupsData={competitionGroups || []}
          seasonsData={seasons || []}
          onFilter={handleSetFilters}
          onClearFilters={onClearFilters}
        />
      </FilterAccordion>
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
        data={notes?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
        onLikeClick={likeNote}
        onUnLikeClick={unlikeNote}
      />
      <Fab href="/notes/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('notes:DELETE_NOTE_CONFIRM_QUESTION', {
          number: noteToDeleteData
            ? getDocumentNumber({
                docNumber: noteToDeleteData.docNumber,
                createdAt: noteToDeleteData.createdAt,
              })
            : null,
        })}
        handleAccept={() => {
          if (noteToDeleteData) {
            deleteNote(noteToDeleteData.id)
          }
          setNoteToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setNoteToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default NotesPage

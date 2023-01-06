import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { InsiderNotesFilterForm } from '@/modules/insider-notes/forms/filter'
import {
  useDeleteInsiderNote,
  useInsiderNotes,
  useLikeInsiderNote,
  useUnLikeInsiderNote,
} from '@/modules/insider-notes/hooks'
import { InsiderNotesTable } from '@/modules/insider-notes/table/table'
import {
  InsiderNotesFiltersState,
  InsiderNotesSortBy,
} from '@/modules/insider-notes/types'
import { usePlayerPositionTypesList } from '@/modules/player-position-types/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { getDocumentNumber } from '@/utils/get-document-number'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'insider-notes'],
  false,
)

const initialFilters: InsiderNotesFiltersState = {
  competitionGroupIds: [],
  competitionIds: [],
  isLiked: false,
  playerIds: [],
  positionIds: [],
  positionTypeIds: [],
  teamIds: [],
}

interface IToDeleteData {
  id: string
  docNumber: number
  date: string
}

const InsiderNotesPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('insider-notes-table')

  const [filters, setFilters] = useLocalStorage<InsiderNotesFiltersState>({
    key: 'insider-notes-filters',
    initialValue: initialFilters,
  })

  const handleSetFilters = (newFilters: InsiderNotesFiltersState) => {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: insiderNotes, isLoading: insiderNotesLoading } =
    useInsiderNotes({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as InsiderNotesSortBy,
      sortingOrder: order,
      ...mapFiltersStateToDto(filters),
    })

  const { mutate: deleteInsiderNote, isLoading: deleteLoading } =
    useDeleteInsiderNote()

  const { data: competitionGroupsData, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: competitionsData, isLoading: competitionsLoading } =
    useCompetitionsList()
  const {
    data: playerPositionTypesData,
    isLoading: playerPostitionTypesLoading,
  } = usePlayerPositionTypesList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const { mutate: likeInsiderNote, isLoading: likeLoading } =
    useLikeInsiderNote()
  const { mutate: unLikeInsiderNote, isLoading: unLikeLoading } =
    useUnLikeInsiderNote()

  const handleDeleteItemClick = (data: IToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    insiderNotesLoading ||
    deleteLoading ||
    competitionGroupsLoading ||
    competitionsLoading ||
    playersLoading ||
    teamsLoading ||
    likeLoading ||
    unLikeLoading ||
    playerPostitionTypesLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('insider-notes:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <InsiderNotesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          competitionGroupsData={competitionGroupsData || []}
          competitionsData={competitionsData || []}
          playerPositionTypesData={playerPositionTypesData || []}
          playersData={playersData || []}
          teamsData={teamsData || []}
        />
      </FilterAccordion>
      <InsiderNotesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={insiderNotes?.totalDocs || 0}
        actions
        data={insiderNotes?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
        likeInsiderNoteClick={likeInsiderNote}
        unLikeInsiderNoteClick={unLikeInsiderNote}
      />
      <Fab href="/insider-notes/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('insider-notes:DELETE_CONFIRM_QUESTION', {
          nr: toDeleteData
            ? getDocumentNumber({
                docNumber: toDeleteData.docNumber,
                createdAt: toDeleteData.date,
              })
            : null,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteInsiderNote(toDeleteData.id)

          setToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default InsiderNotesPage

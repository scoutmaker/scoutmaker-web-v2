import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content';
import { Fab } from '@/components/fab/fab';
import { Loader } from '@/components/loader/loader';
import { ConfirmationModal } from '@/components/modals/confirmation-modal';
import { PageHeading } from '@/components/page-heading/page-heading';
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks';
import { useCompetitionsList } from '@/modules/competitions/hooks';
import { InsiderNotesFilterForm } from '@/modules/insider-notes/forms/filter';
import { useDeleteInsiderNote, useInsiderNotes, useLikeInsiderNote, useUnLikeInsiderNote } from '@/modules/insider-notes/hooks';
import { InsiderNotesTableRow } from '@/modules/insider-notes/table/row';
import { InsiderNotesTable } from '@/modules/insider-notes/table/table';
import { InsiderNotesFiltersDto, InsiderNotesSortBy } from '@/modules/insider-notes/types';
import { usePlayerPositionsList } from '@/modules/player-positions/hooks';
import { usePlayersList } from '@/modules/players/hooks';
import { useTeamsList } from '@/modules/teams/hooks';
import { useLocalStorage } from '@/utils/hooks/use-local-storage';
import { useTable } from '@/utils/hooks/use-table';
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole';

export const getServerSideProps = withSessionSsrRole(['common', 'insider-notes'], false);

const initialFilters: InsiderNotesFiltersDto = {
  competitionGroupIds: [],
  competitionIds: [],
  isLiked: false,
  playerIds: [],
  positionIds: [],
  teamIds: []
}

const InsiderNotesPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] =
    useState<{ id: number, date: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('insider-notes-table')

  const [filters, setFilters] = useLocalStorage<InsiderNotesFiltersDto>({
    key: 'insider-notes-filters',
    initialValue: initialFilters
  })

  const handleSetFilters = (newFilters: InsiderNotesFiltersDto) => {
    setFilters(newFilters);
    handleChangePage(null, 0);
  };

  const { data: insiderNotes, isLoading: insiderNotesLoading } = useInsiderNotes({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as InsiderNotesSortBy,
    sortingOrder: order,
    ...filters,
  });

  const { mutate: deleteInsiderNote, isLoading: deleteLoading } = useDeleteInsiderNote();

  const { data: competitionGroupsData, isLoading: competitionGroupsLoading } = useCompetitionGroupsList()
  const { data: competitionsData, isLoading: competitionsLoading } = useCompetitionsList()
  const { data: playerPositionsData, isLoading: playerPostitionsLoading } = usePlayerPositionsList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const { mutate: likeInsiderNote, isLoading: likeLoading } = useLikeInsiderNote()
  const { mutate: unLikeInsiderNote, isLoading: unLikeLoading } = useUnLikeInsiderNote()

  const isLoading =
    insiderNotesLoading ||
    deleteLoading ||
    competitionGroupsLoading ||
    competitionsLoading ||
    playerPostitionsLoading ||
    playersLoading ||
    teamsLoading || likeLoading || unLikeLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t("insider-notes:INDEX_PAGE_TITLE")}
      />
      <InsiderNotesFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
        competitionGroupsData={competitionGroupsData || []}
        competitionsData={competitionsData || []}
        playerPositionsData={playerPositionsData || []}
        playersData={playersData || []}
        teamsData={teamsData || []}
      />
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
      >
        {!!insiderNotes && insiderNotes?.docs.map(insNote => (
          <InsiderNotesTableRow
            key={insNote.id}
            data={insNote}
            onEditClick={() => router.push(`/insider-notes/edit/${insNote.id}`)}
            onDeleteClick={() => {
              setToDeleteData({ id: insNote.id, date: insNote.createdAt })
              setIsDeleteConfirmationModalOpen(true)
            }}
            isEditOptionEnabled
            isDeleteOptionEnabled
            onLikeClick={likeInsiderNote}
            onUnlikeClick={unLikeInsiderNote}
          />
        ))}
      </InsiderNotesTable>
      <Fab href="/insider-notes/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('insider-notes:DELETE_CONFIRM_QUESTION', { nr: toDeleteData ? `${toDeleteData.id}/${new Date(toDeleteData.date).getFullYear()}` : null })}
        handleAccept={() => {
          if (toDeleteData)
            deleteInsiderNote(toDeleteData.id)

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
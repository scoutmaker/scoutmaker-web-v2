import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useUser } from '@/modules/auth/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { PlayerGradesFilterForm } from '@/modules/player-grades/forms/filter'
import {
  useDeletePlayerGrade,
  usePlayerGrades,
} from '@/modules/player-grades/hooks'
import { PlayerGradesTable } from '@/modules/player-grades/table/table'
import {
  PlayerGradesFiltersState,
  PlayerGradesSortBy,
} from '@/modules/player-grades/types'
import { usePlayersList } from '@/modules/players/hooks'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'player-grades'],
  false,
)

const initialFilters: PlayerGradesFiltersState = {
  competitionIds: [],
  playerIds: [],
  grades: [],
}

const PlayerGradesPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('player-grades-table')

  const [filters, setFilters] = useLocalStorage<PlayerGradesFiltersState>({
    key: 'player-grades-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: PlayerGradesFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const playerGrades = usePlayerGrades({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as PlayerGradesSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const user = useUser()
  const userRole = user.data?.role

  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: competitionsData, isLoading: competitionsLoading } =
    useCompetitionsList()

  const { mutate: deletePlayerGrade, isLoading: deleteLoading } =
    useDeletePlayerGrade()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    playerGrades.isLoading ||
    deleteLoading ||
    user.isLoading ||
    playersLoading ||
    competitionsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-grades:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <PlayerGradesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          playersData={playersData || []}
          competitionsData={competitionsData || []}
        />
      </FilterAccordion>
      <PlayerGradesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={playerGrades.data?.totalDocs || 0}
        data={playerGrades.data?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
        actions={userRole === 'ADMIN' || userRole === 'PLAYMAKER_SCOUT_MANAGER'}
      />
      {(userRole === 'ADMIN' || userRole === 'PLAYMAKER_SCOUT_MANAGER') && (
        <Fab href="/player-grades/create" />
      )}
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('player-grades:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deletePlayerGrade(toDeleteData.id)

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

export default PlayerGradesPage

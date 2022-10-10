import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { PlayerPositionsFilterForm } from '@/modules/player-positions/forms/filter'
import {
  useDeletePlayerPosition,
  usePlayerPositions,
} from '@/modules/player-positions/hooks'
import { PlayerPositionsTable } from '@/modules/player-positions/table/table'
import {
  PlayerPositionsFiltersDto,
  PlayerPositionsSortBy,
} from '@/modules/player-positions/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'player-positions'],
  ['ADMIN'],
)

const initialFilters: PlayerPositionsFiltersDto = {
  name: '',
  code: '',
}

const PlayerPositionsPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('player-positions-table')

  const [filters, setFilters] = useLocalStorage<PlayerPositionsFiltersDto>({
    key: 'player-positions-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: PlayerPositionsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: playerPositions, isLoading: dataLoading } = usePlayerPositions({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as PlayerPositionsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deletePlayerPosition, isLoading: deleteLoading } =
    useDeletePlayerPosition()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading = dataLoading || deleteLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-positions:INDEX_PAGE_TITLE')} />
      <PlayerPositionsFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <PlayerPositionsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={playerPositions?.totalDocs || 0}
        actions
        data={playerPositions?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/player-positions/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('player-positions:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deletePlayerPosition(toDeleteData.id)

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

export default PlayerPositionsPage

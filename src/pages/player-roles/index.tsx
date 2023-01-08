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
import { usePlayerPositionTypesList } from '@/modules/player-position-types/hooks'
import { PlayerRolesFilterForm } from '@/modules/player-roles/forms/filter'
import {
  useDeletePlayerRole,
  usePlayerRoles,
} from '@/modules/player-roles/hooks'
import { PlayerRolesTable } from '@/modules/player-roles/table/table'
import {
  PlayerRolesFiltersState,
  PlayerRolesSortBy,
} from '@/modules/player-roles/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'player-roles'],
  false,
)

const initialFilters: PlayerRolesFiltersState = {
  name: '',
  positionTypeIds: [],
  altName: '',
}

const PlayerRolesPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('player-roles-table')

  const [filters, setFilters] = useLocalStorage<PlayerRolesFiltersState>({
    key: 'player-roles-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: PlayerRolesFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const playerRoles = usePlayerRoles({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as PlayerRolesSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const positionTypes = usePlayerPositionTypesList()
  const user = useUser()

  const { mutate: deletePlayerRole, isLoading: deleteLoading } =
    useDeletePlayerRole()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    playerRoles.isLoading ||
    deleteLoading ||
    positionTypes.isLoading ||
    user.isLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-roles:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <PlayerRolesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          positionTypesData={positionTypes.data || []}
        />
      </FilterAccordion>
      <PlayerRolesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={playerRoles.data?.totalDocs || 0}
        actions
        data={playerRoles.data?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
        showTableMenu={user.data?.role === 'ADMIN'}
      />
      {user.data?.role === 'ADMIN' && <Fab href="/player-roles/create" />}
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('player-roles:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deletePlayerRole(toDeleteData.id)

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

export default PlayerRolesPage

import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { usePlayersList } from '@/modules/players/hooks'
import { UserPlayerAclFilterForm } from '@/modules/user-player-acl/forms/filter'
import {
  useDeleteUserPlayerAcl,
  useUserPlayerAcls,
} from '@/modules/user-player-acl/hooks'
import { UserPlayerAclTable } from '@/modules/user-player-acl/table/table'
import {
  UserPlayerAceSortBy,
  UserPlayerAclFiltersState,
} from '@/modules/user-player-acl/types'
import { useUsersList } from '@/modules/users/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UserPlayerAclFiltersState = {
  playerId: null,
  userId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-player-acl', 'permissions'],
  ['ADMIN'],
)

const UserPlayerAclsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('userPlayerAclTable')

  const [filters, setFilters] = useLocalStorage<UserPlayerAclFiltersState>({
    key: 'user-player-acl-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: UserPlayerAclFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: userPlayerAcls, isLoading: dataLoading } = useUserPlayerAcls({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as UserPlayerAceSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const { mutate: deleteUserPlayerAcl, isLoading: deleteLoading } =
    useDeleteUserPlayerAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || usersLoading || playersLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-player-acl:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <UserPlayerAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          playersData={playersData || []}
          usersData={usersData || []}
        />
      </FilterAccordion>
      <UserPlayerAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={userPlayerAcls?.totalDocs || 0}
        actions
        data={userPlayerAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/user-player-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('user-player-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteUserPlayerAcl(toDeleteData.id)

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

export default UserPlayerAclsPage

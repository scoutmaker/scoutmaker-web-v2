import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { SeasonsFilterForm } from '@/modules/seasons/forms/filter'
import {
  useDeleteUserFootballRole,
  useUserFootballRoles,
} from '@/modules/user-football-roles/hooks'
import { UserFootballRolesTable } from '@/modules/user-football-roles/table/table'
import {
  UserFootballRolesFiltersDto,
  UserFootballRolesSortBy,
} from '@/modules/user-football-roles/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UserFootballRolesFiltersDto = {
  name: '',
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-football-roles'],
  ['ADMIN'],
)

const UserFootballRolesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('userFootballRolesTable')

  const [filters, setFilters] = useLocalStorage<UserFootballRolesFiltersDto>({
    key: 'user-football-roles-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: UserFootballRolesFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: userFootballRoles, isLoading: dataLoading } =
    useUserFootballRoles({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as UserFootballRolesSortBy,
      sortingOrder: order,
      ...filters,
    })

  const { mutate: deleteRole, isLoading: deleteLoading } =
    useDeleteUserFootballRole()

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
      <PageHeading title={t('user-football-roles:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <SeasonsFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <UserFootballRolesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={userFootballRoles?.totalDocs || 0}
        actions
        data={userFootballRoles?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/user-football-roles/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('user-football-roles:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData) deleteRole(toDeleteData.id)

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

export default UserFootballRolesPage

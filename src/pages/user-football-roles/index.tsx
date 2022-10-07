import { useRouter } from 'next/router'
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
import { UserFootballRolesTableRow } from '@/modules/user-football-roles/table/row'
import { UserFootballRolesTable } from '@/modules/user-football-roles/table/table'
import {
  UserFootballRolesFiltersDto,
  UserFootballRolesSortBy,
} from '@/modules/user-football-roles/types'
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

interface IToDeleteData {
  id: string
  name: string
}

const UserFootballRolesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<IToDeleteData>()

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
      >
        {!!userFootballRoles &&
          userFootballRoles.docs.map(role => (
            <UserFootballRolesTableRow
              key={role.id}
              data={role}
              onEditClick={() => {
                router.push(`/user-football-roles/edit/${role.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: role.id, name: role.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </UserFootballRolesTable>
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

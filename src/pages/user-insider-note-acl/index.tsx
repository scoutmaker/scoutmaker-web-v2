import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useInsiderNotesList } from '@/modules/insider-notes/hooks'
import { UserInsiderNoteAclFilterForm } from '@/modules/user-insider-note-acl/forms/filter'
import {
  useDeleteUserInsiderNoteAcl,
  useUserInsiderNoteAcls,
} from '@/modules/user-insider-note-acl/hooks'
import { UserInsiderNoteAclTable } from '@/modules/user-insider-note-acl/table/table'
import {
  UserInsiderNoteAclFiltersState,
  UserInsiderNoteAclSortBy,
} from '@/modules/user-insider-note-acl/types'
import { useUsersList } from '@/modules/users/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UserInsiderNoteAclFiltersState = {
  insiderNoteId: null,
  userId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-insider-note-acl', 'permissions'],
  ['ADMIN'],
)

const UserInsiderNoteAclsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('userInsiderNoteAclTable')

  const [filters, setFilters] = useLocalStorage<UserInsiderNoteAclFiltersState>(
    {
      key: 'user-insider-note-acl-filters',
      initialValue: initialFilters,
    },
  )

  function handleSetFilters(newFilters: UserInsiderNoteAclFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: userInsiderNotesAcls, isLoading: dataLoading } =
    useUserInsiderNoteAcls({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as UserInsiderNoteAclSortBy,
      sortingOrder: order,
      ...mapFiltersStateToDto(filters),
    })

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: insiderNotesData, isLoading: insiderNotesLoading } =
    useInsiderNotesList()

  const { mutate: deleteUserInsiderNoteAcl, isLoading: deleteLoading } =
    useDeleteUserInsiderNoteAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || usersLoading || insiderNotesLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-insider-note-acl:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <UserInsiderNoteAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          insiderNotesData={insiderNotesData || []}
          usersData={usersData || []}
        />
      </FilterAccordion>
      <UserInsiderNoteAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={userInsiderNotesAcls?.totalDocs || 0}
        actions
        data={userInsiderNotesAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/user-insider-note-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('user-insider-note-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteUserInsiderNoteAcl(toDeleteData.id)

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

export default UserInsiderNoteAclsPage

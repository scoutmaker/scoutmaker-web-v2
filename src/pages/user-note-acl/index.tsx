import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useNotesList } from '@/modules/notes/hooks'
import { UserNoteAclFilterForm } from '@/modules/user-note-acl/forms/filter'
import {
  useDeleteUserNoteAcl,
  useUserNoteAcls,
} from '@/modules/user-note-acl/hooks'
import { UserNoteAclTable } from '@/modules/user-note-acl/table/table'
import {
  UserNoteAclFiltersState,
  UserNoteAclSortBy,
} from '@/modules/user-note-acl/types'
import { useUsersList } from '@/modules/users/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UserNoteAclFiltersState = {
  noteId: null,
  userId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'user-note-acl', 'permissions'],
  ['ADMIN'],
)

const UserNoteAclsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('userNoteAclTable')

  const [filters, setFilters] = useLocalStorage<UserNoteAclFiltersState>({
    key: 'user-note-acl-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: UserNoteAclFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: userNoteAcls, isLoading: dataLoading } = useUserNoteAcls({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as UserNoteAclSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { data: usersData, isLoading: usersLoading } = useUsersList()
  const { data: notesData, isLoading: notesLoading } = useNotesList()

  const { mutate: deleteUserNoteAcl, isLoading: deleteLoading } =
    useDeleteUserNoteAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading = dataLoading || deleteLoading || notesLoading || usersLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('user-note-acl:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <UserNoteAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          notesData={notesData || []}
          usersData={usersData || []}
        />
      </FilterAccordion>
      <UserNoteAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={userNoteAcls?.totalDocs || 0}
        actions
        data={userNoteAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/user-note-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('user-note-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteUserNoteAcl(toDeleteData.id)

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

export default UserNoteAclsPage

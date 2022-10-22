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
import { OrganizationNoteAclFilterForm } from '@/modules/organization-note-acl/forms/filter'
import {
  useDeleteOrganizationNoteAcl,
  useOrganizationNoteAcls,
} from '@/modules/organization-note-acl/hooks'
import { OrganizationNoteAclTable } from '@/modules/organization-note-acl/table/table'
import {
  OrganizationNoteAclFiltersState,
  OrganizationNoteAclSortBy,
} from '@/modules/organization-note-acl/types'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: OrganizationNoteAclFiltersState = {
  noteId: null,
  playerId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-note-acl', 'permissions'],
  ['ADMIN'],
)

const OrganizationNoteAclPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('organizationNoteAclTable')

  const [filters, setFilters] =
    useLocalStorage<OrganizationNoteAclFiltersState>({
      key: 'organization-note-acl-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(newFilters: OrganizationNoteAclFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: organizationNoteAcls, isLoading: dataLoading } =
    useOrganizationNoteAcls({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as OrganizationNoteAclSortBy,
      sortingOrder: order,
      ...mapFiltersStateToDto(filters),
    })

  const { data: notesData, isLoading: notesLoading } = useNotesList()
  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()

  const { mutate: deleteOrganizationNoteAcl, isLoading: deleteLoading } =
    useDeleteOrganizationNoteAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || notesLoading || organizationsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-note-acl:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <OrganizationNoteAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          notesData={notesData || []}
          organizationsData={organizationsData || []}
        />
      </FilterAccordion>
      <OrganizationNoteAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={organizationNoteAcls?.totalDocs || 0}
        actions
        data={organizationNoteAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/organization-note-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('organization-note-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteOrganizationNoteAcl(toDeleteData.id)

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

export default OrganizationNoteAclPage

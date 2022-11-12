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
import { OrganizationInsiderNoteAclFilterForm } from '@/modules/organization-insider-note-acl/forms/filter'
import {
  useDeleteOrganizationInsiderNoteAcl,
  useOrganizationInsiderNoteAcls,
} from '@/modules/organization-insider-note-acl/hooks'
import { OrganizationInsiderNoteAclTable } from '@/modules/organization-insider-note-acl/table/table'
import {
  OrganizationInsiderNoteAclFiltersState,
  OrganizationInsiderNoteAclSortBy,
} from '@/modules/organization-insider-note-acl/types'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: OrganizationInsiderNoteAclFiltersState = {
  insiderNoteId: null,
  organizationId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-insider-note-acl', 'permissions'],
  ['ADMIN'],
)

const OrganizationInsiderNoteAclPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('organizationInsiderNoteAclTable')

  const [filters, setFilters] =
    useLocalStorage<OrganizationInsiderNoteAclFiltersState>({
      key: 'organization-insider-note-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(
    newFilters: OrganizationInsiderNoteAclFiltersState,
  ) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: organizationInsiderNoteAcls, isLoading: dataLoading } =
    useOrganizationInsiderNoteAcls({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as OrganizationInsiderNoteAclSortBy,
      sortingOrder: order,
      ...mapFiltersStateToDto(filters),
    })

  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()
  const { data: insiderNotesData, isLoading: insiderNotesLoading } =
    useInsiderNotesList()

  const { mutate: deleteOrganizationInsiderNote, isLoading: deleteLoading } =
    useDeleteOrganizationInsiderNoteAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || organizationsLoading || insiderNotesLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('organization-insider-note-acl:INDEX_PAGE_TITLE')}
      />
      <FilterAccordion>
        <OrganizationInsiderNoteAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          insiderNotesData={insiderNotesData || []}
          organizationsData={organizationsData || []}
        />
      </FilterAccordion>
      <OrganizationInsiderNoteAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={organizationInsiderNoteAcls?.totalDocs || 0}
        actions
        data={organizationInsiderNoteAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/organization-insider-note-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('organization-insider-note-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteOrganizationInsiderNote(toDeleteData.id)

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

export default OrganizationInsiderNoteAclPage

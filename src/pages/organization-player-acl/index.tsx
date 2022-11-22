import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationPlayerAclFilterForm } from '@/modules/organization-player-acl/forms/filter'
import {
  useDeleteOrganizationPlayerAcl,
  useOrganizationPlayerAcls,
} from '@/modules/organization-player-acl/hooks'
import { OrganizationPlayerAclTable } from '@/modules/organization-player-acl/table/table'
import {
  OrganizationPlayerAclFiltersState,
  OrganizationPlayerAclSortBy,
} from '@/modules/organization-player-acl/types'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: OrganizationPlayerAclFiltersState = {
  organizationId: null,
  playerId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-player-acl', 'permissions'],
  ['ADMIN'],
)

const OrganizationPlayerAclsPage = ({
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
  } = useTable('organizationPlayerAclTable')

  const [filters, setFilters] =
    useLocalStorage<OrganizationPlayerAclFiltersState>({
      key: 'organization-player-acl-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(newFilters: OrganizationPlayerAclFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: organizationPlayerAcls, isLoading: dataLoading } =
    useOrganizationPlayerAcls({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as OrganizationPlayerAclSortBy,
      sortingOrder: order,
      ...mapFiltersStateToDto(filters),
    })

  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const { mutate: deleteAcl, isLoading: deleteLoading } =
    useDeleteOrganizationPlayerAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || organizationsLoading || playersLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-player-acl:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <OrganizationPlayerAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          organiztaionsData={organizationsData || []}
          playersData={playersData || []}
        />
      </FilterAccordion>
      <OrganizationPlayerAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={organizationPlayerAcls?.totalDocs || 0}
        actions
        data={organizationPlayerAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/organization-player-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('organization-player-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteAcl(toDeleteData.id)

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

export default OrganizationPlayerAclsPage

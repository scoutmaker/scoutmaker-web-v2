import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationReportAclFilterForm } from '@/modules/organization-report-acl/forms/filter'
import {
  useDeleteOrganizationReportAcl,
  useOrganizationReportAcls,
} from '@/modules/organization-report-acl/hooks'
import { OrganizationReportAclTable } from '@/modules/organization-report-acl/table/table'
import {
  OrganizationReportAclFiltersState,
  OrganizationReportAclSortBy,
} from '@/modules/organization-report-acl/types'
import { useOrganizationsList } from '@/modules/organizations/hooks'
import { useReportsList } from '@/modules/reports/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: OrganizationReportAclFiltersState = {
  organizationId: null,
  reportId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'organization-report-acl', 'permissions'],
  ['ADMIN'],
)

const OrganizationReportAclPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('organization-report-aclTable')

  const [filters, setFilters] =
    useLocalStorage<OrganizationReportAclFiltersState>({
      key: 'organization-report-acl-filters',
      initialValue: initialFilters,
    })

  function handleSetFilters(newFilters: OrganizationReportAclFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: organizationReportAcls, isLoading: dataLoading } =
    useOrganizationReportAcls({
      page: page + 1,
      limit: rowsPerPage,
      sortBy: sortBy as OrganizationReportAclSortBy,
      sortingOrder: order,
      ...mapFiltersStateToDto(filters),
    })

  const { data: reportsData, isLoading: reportsLoading } = useReportsList()
  const { data: organizationsData, isLoading: organizationsLoading } =
    useOrganizationsList()

  const { mutate: deleteOrganizationReportAcl, isLoading: deleteLoading } =
    useDeleteOrganizationReportAcl()

  const handleDeleteItemClick = (data: { id: string }) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading || deleteLoading || organizationsLoading || reportsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organization-report-acl:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <OrganizationReportAclFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          organizationsData={organizationsData || []}
          reportsData={reportsData || []}
        />
      </FilterAccordion>
      <OrganizationReportAclTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={organizationReportAcls?.totalDocs || 0}
        actions
        data={organizationReportAcls?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/organization-report-acl/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('organization-report-acl:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteOrganizationReportAcl(toDeleteData.id)

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

export default OrganizationReportAclPage

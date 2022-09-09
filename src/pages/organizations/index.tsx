import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationsFilterForm } from '@/modules/organizations/forms/filter'
import { useDeleteOrganization, useOrganizations } from '@/modules/organizations/hooks'
import { OrganizationsTableRow } from '@/modules/organizations/table/row'
import { OrganizationsTable } from '@/modules/organizations/table/table'
import { OrganizationsFiltersDto, OrganizationsSortBy } from '@/modules/organizations/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: OrganizationsFiltersDto = {
  name: ''
}

export const getServerSideProps = withSessionSsrRole(['common', 'organizations'], ['ADMIN'])

interface IToDeleteData {
  id: number
  name: string
}

const OrganizationsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] =
    useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('organizationsTable')

  const [filters, setFilters] = useLocalStorage<OrganizationsFiltersDto>({
    key: 'organizations-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: OrganizationsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: organizations, isLoading: dataLoading } = useOrganizations({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as OrganizationsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteOrganization, isLoading: deleteLoading } = useDeleteOrganization()

  const isLoading = dataLoading || deleteLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organizations:INDEX_PAGE_TITLE')} />
      <OrganizationsFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <OrganizationsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={organizations?.totalDocs || 0}
        actions
      >
        {!!organizations &&
          organizations.docs.map(org => (
            <OrganizationsTableRow
              key={org.id}
              data={org}
              onEditClick={() => {
                router.push(`/organizations/edit/${org.id}`)
              }}
              onDeleteClick={() => {
                setToDeleteData({ id: org.id, name: org.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))
        }
      </OrganizationsTable>
      <Fab href="/organizations/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('organizations:DELETE_CONFIRM_QUESTION', {
          name: toDeleteData?.name,
        })}
        handleAccept={() => {
          if (toDeleteData)
            deleteOrganization(toDeleteData.id)

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

export default OrganizationsPage
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCountriesList } from '@/modules/countries/hooks'
import { RegionsFilterForm } from '@/modules/regions/forms/filter'
import { useDeleteRegion, useRegions } from '@/modules/regions/hooks'
import { RegionsTable } from '@/modules/regions/table/regions'
import { RegionsFiltersState, RegionsSortBy } from '@/modules/regions/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'regions'],
  ['ADMIN'],
)

const initialFilters: RegionsFiltersState = {
  name: '',
  countryId: null,
}

const RegionsPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [regionToDeleteData, setRegionToDeleteData] =
    useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('regions-table')

  const [filters, setFilters] = useLocalStorage<RegionsFiltersState>({
    key: 'regions-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: RegionsFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountriesList()

  const { data: regions, isLoading: regionsLoading } = useRegions({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as RegionsSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { mutate: deleteRegion, isLoading: deleteRegionLoading } =
    useDeleteRegion()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setRegionToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading = countriesLoading || regionsLoading || deleteRegionLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('regions:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <RegionsFilterForm
          filters={filters}
          countriesData={countries || []}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <RegionsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={regions?.totalDocs || 0}
        actions
        data={regions?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/regions/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('regions:DELETE_CONFIRM_QUESTION', {
          name: regionToDeleteData?.name,
        })}
        handleAccept={() => {
          if (regionToDeleteData) deleteRegion(regionToDeleteData.id)

          setRegionToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setRegionToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default RegionsPage

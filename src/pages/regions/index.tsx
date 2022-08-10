import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCountriesList } from '@/modules/countries/hooks'
import { RegionsFilterForm } from '@/modules/regions/forms/filter'
import {
  useDeleteRegion,
  useRegions,
} from '@/modules/regions/hooks'
import { RegionsTable } from '@/modules/regions/table/regions'
import { RegionsTableRow } from '@/modules/regions/table/regions-row'
import { RegionsFilterDto, RegionsSortBy } from '@/modules/regions/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'regions'], ['ADMIN'])

const initialFilters: RegionsFilterDto = {
  name: '',
  countryId: 0,
}

interface IRegionToDeleteData {
  id: number
  name: string
}

const RegionsPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [regionToDeleteData, setRegionToDeleteData] =
    useState<IRegionToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('regions-table')

  const [filters, setFilters] = useLocalStorage<RegionsFilterDto>({
    key: 'regions-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: RegionsFilterDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountriesList()

  const { data: regions, isLoading: regionsLoading } = useRegions({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as RegionsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteRegion, isLoading: deleteRegionLoading } =
    useDeleteRegion()

  const isLoading = countriesLoading || regionsLoading || deleteRegionLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('regions:INDEX_PAGE_TITLE')} />
      <RegionsFilterForm
        filters={filters}
        countriesData={countries || []}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
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
      >
        {!!regions &&
          regions.docs.map(region => (
            <RegionsTableRow
              key={region.id}
              data={region}
              onEditClick={() => {
                router.push(`/regions/edit/${region.id}`)
              }}
              onDeleteClick={() => {
                setRegionToDeleteData({ id: region.id, name: region.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </RegionsTable>
      <Fab href="/regions/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('regions:DELETE_CONFIRM_QUESTION', {
          name: regionToDeleteData?.name,
        })}
        handleAccept={() => {
          if (regionToDeleteData)
            deleteRegion(regionToDeleteData.id)

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

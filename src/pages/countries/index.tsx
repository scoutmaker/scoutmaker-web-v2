import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CountriesFilterForm } from '@/modules/countries/forms/filter'
import { useCountries, useDeleteCountry } from '@/modules/countries/hooks'
import { CountriesTable } from '@/modules/countries/table/countries'
import { CountriesFiltersDto, CountriesSortBy } from '@/modules/countries/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'countries'],
  ['ADMIN'],
)

const initialFilters: CountriesFiltersDto = {
  isEuMember: false,
}

const CountriesPage = ({ errorStatus, errorMessage }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [countryToDeleteData, setcCountryToDeleteData] =
    useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('countries-table')

  const [filters, setFilters] = useLocalStorage<CountriesFiltersDto>({
    key: 'countries-filters',
    initialValue: initialFilters,
  })

  const handleSetFilters = (newFilters: CountriesFiltersDto) => {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountries({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as CountriesSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteCountry, isLoading: deleteCountryLoading } =
    useDeleteCountry()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setcCountryToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading = countriesLoading || deleteCountryLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('countries:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <CountriesFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <CountriesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={countries?.totalDocs || 0}
        actions
        data={countries?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/countries/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('countries:DELETE_CONFIRM_QUESTION', {
          name: countryToDeleteData?.name,
        })}
        handleAccept={() => {
          if (countryToDeleteData) deleteCountry(countryToDeleteData.id)

          setcCountryToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setcCountryToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default CountriesPage

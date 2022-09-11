import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CountriesFilterForm } from '@/modules/countries/forms/filter'
import { useCountries, useDeleteCountry } from '@/modules/countries/hooks'
import { CountriesTable } from '@/modules/countries/table/countries'
import { CountriesTableRow } from '@/modules/countries/table/countries-row'
import { CountriesFiltersDto, CountriesSortBy } from '@/modules/countries/types'
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
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [countryToDeleteData, setcCountryToDeleteData] = useState<{
    id: string
    name: string
  }>()

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

  const isLoading = countriesLoading || deleteCountryLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('countries:INDEX_PAGE_TITLE')} />
      <CountriesFilterForm
        filters={filters}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
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
      >
        {!countriesLoading &&
          countries?.docs.map(country => (
            <CountriesTableRow
              key={country.id}
              data={country}
              onEditClick={() => router.push(`/countries/edit/${country.id}`)}
              onDeleteClick={() => {
                setcCountryToDeleteData({ id: country.id, name: country.name })
                setIsDeleteConfirmationModalOpen(true)
              }}
              isEditOptionEnabled
              isDeleteOptionEnabled
            />
          ))}
      </CountriesTable>
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

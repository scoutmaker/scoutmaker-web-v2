import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'

import { Fab } from '@/components/fab/fab';
import { Loader } from '@/components/loader/loader';
import { PageHeading } from '@/components/page-heading/page-heading';
import { withSessionSsr } from '@/modules/auth/session';
import { CountriesFilterForm } from '@/modules/countries/forms/filter';
import { useCountries } from '@/modules/countries/hooks';
import { CountriesTable } from '@/modules/countries/table/countries';
import { CountriesTableRow } from '@/modules/countries/table/countries-row';
import { CountriesFiltersDto, CountriesSortBy } from '@/modules/countries/types';
import { useLocalStorage } from '@/utils/hooks/use-local-storage';
import { useTable } from '@/utils/hooks/use-table';
import { redirectToLogin } from '@/utils/redirect-to-login';

// TO_ADD ADMIN AUTH
export const getServerSideProps = withSessionSsr(
  async ({ locale, req, res }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'countries',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const initialFilters: CountriesFiltersDto = {
  isEuMember: false
}

const CountriesPage = () => {
  const { t } = useTranslation();
  // TO_ADD REMOVE THIS
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('countries-table')

  const [filters, setFilters] = useLocalStorage<CountriesFiltersDto>({
    key: 'countries-filters',
    initialValue: initialFilters
  })

  const handleSetFilters = (newFilters: CountriesFiltersDto) => {
    setFilters(newFilters);
    handleChangePage(null, 0);
  };

  const { data: countries, isLoading: countriesLoading } = useCountries({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as CountriesSortBy,
    sortingOrder: order,
    ...filters,
  });

  const isLoading = countriesLoading;

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t("countries:INDEX_PAGE_TITLE")} />
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
        {!countriesLoading && countries?.docs.map(country => (
          <CountriesTableRow
            key={country.id}
            data={country}
            onEditClick={() => null /* TO_ADD */}
            onDeleteClick={() => null /* TO_ADD */}
            isEditOptionEnabled
            isDeleteOptionEnabled
          />
        ))}
      </CountriesTable>
      <Fab href="/countries/create" />
      {/* TO_ADD DELETE CONFIRMATION MODAL */}
    </>
  )
}

export default CountriesPage
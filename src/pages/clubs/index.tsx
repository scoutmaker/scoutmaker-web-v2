import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { useUser } from '../../lib/auth'
import { withSessionSsr } from '../../lib/session'
import { redirectToLogin } from '../../utils/redirect-to-login'
import { useTable } from '../../lib/use-table'
import { useLocalStorage } from '../../lib/use-local-storage'
import { ClubDto, ClubsFiltersDto, ClubsSortBy } from '../../types/clubs'
import { PageHeading } from '../../components/page-heading/page-heading'
import { useClubs } from '../../lib/clubs'
import { ClubsFilterForm } from '../../components/forms/clubs-filter-form'
import { useCountriesList } from '../../lib/countries'
import { useRegionsList } from '../../lib/regions'
import { ClubsTable } from '../../components/tables/clubs'
import { ClubsTableRow } from '../../components/tables/rows/clubs-row'
import { Fab } from '../../components/fab/fab'

export const getServerSideProps = withSessionSsr(
  async ({ locale, req, res }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const initialFilters: ClubsFiltersDto = {
  name: '',
  countryId: '',
  regionId: '',
}

const ClubsPage = () => {
  const user = useUser()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('clubsTable')

  const [filters, setFilters] = useLocalStorage<ClubsFiltersDto>({
    key: 'clubs-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ClubsFiltersDto) {
    console.log('CLEARING FILRES', { newFilters })
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountriesList()

  const { data: regions, isLoading: regionsLoading } = useRegionsList()

  const [currentClub, setCurrentClub] = useState<ClubDto | null>(null)

  const { data: clubs, isLoading: clubsLoading } = useClubs({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as ClubsSortBy,
    sortingOrder: order,
    ...filters,
  })

  // const { mutate: createClub, isLoading: createClubLoading } = useCreateClub()
  // const { mutate: updateClub, isLoading: updateClubLoading } = useUpdateClub(
  //   currentClub?.id || '',
  // )
  // const { mutate: deleteClub, isLoading: deleteClubLoading } = useDeleteClub()

  // const handleEditClick = (club: ClubDto) => {
  //   setCurrentClub(club)
  //   setActiveTab(1)
  // }

  // const handleSubmit = (data: ClubDto) => {
  //   if (currentClub) {
  //     updateClub(data)
  //     setActiveTab(0)
  //     setCurrentClub(null)
  //   } else {
  //     createClub(data)
  //     setActiveTab(0)
  //   }
  // }

  // const handleFormReset = () => {
  //   setActiveTab(0)
  //   setCurrentClub(null)
  // }

  return (
    <>
      {/* {(clubsLoading ||
        createClubLoading ||
        updateClubLoading ||
        deleteClubLoading) && <Loader />} */}
      <PageHeading title="Baza klubów" />
      <ClubsFilterForm
        filters={filters}
        countriesData={countries || []}
        regionsData={regions || []}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <ClubsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={clubs?.totalDocs || 0}
        actions
      >
        {clubs
          ? clubs.docs.map(club => (
              <ClubsTableRow
                key={club.id}
                data={club}
                onEditClick={() => console.log('hello')}
                onDeleteClick={() => console.log('hello')}
                isEditOptionEnabled={false}
                isDeleteOptionEnabled={false}
              />
            ))
          : null}
      </ClubsTable>
      <Fab href="/clubs/create" />
      {/* <TabPanel value={activeTab} index={1} title="clubs">
        <PageHeading
          title={currentClub ? 'Edycja klubu' : 'Tworzenie nowego klubu'}
        /> */}
      {/* <ClubsForm
          current={currentClub}
          onSubmit={handleSubmit}
          onCancelClick={handleFormReset}
        /> */}
      {/* </TabPanel> */}
    </>
  )
}

export default ClubsPage

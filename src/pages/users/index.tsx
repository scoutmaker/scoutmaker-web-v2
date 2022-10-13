import { useTranslation } from 'next-i18next'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useClubsList } from '@/modules/clubs/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { useUserFootballRolesList } from '@/modules/user-football-roles/hooks'
import { UsersFilterForm } from '@/modules/users/forms/filter'
import {
  useSetPMScoutRoleUser,
  useSetScoutRoleUser,
  useUsers,
} from '@/modules/users/hooks'
import { UsersTable } from '@/modules/users/table/table'
import { UsersFiltersState, UsersSortBy } from '@/modules/users/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UsersFiltersState = {
  clubIds: [],
  footballRoleIds: [],
  name: '',
  regionIds: [],
  role: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'users'],
  ['ADMIN'],
)

const UsersPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('usersTable')

  const [filters, setFilters] = useLocalStorage<UsersFiltersState>({
    key: 'users-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: UsersFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: users, isLoading: dataLoading } = useUsers({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as UsersSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { data: regions, isLoading: regionsLoading } = useRegionsList()
  const { data: userFootballRoles, isLoading: userFootballRolesLoading } =
    useUserFootballRolesList()

  const { mutate: setScoutRole, isLoading: scoutRoleLoading } =
    useSetScoutRoleUser()
  const { mutate: setPMScoutRole, isLoading: pmScoutRoleLoading } =
    useSetPMScoutRoleUser()

  const isLoading =
    dataLoading ||
    clubsLoading ||
    regionsLoading ||
    userFootballRolesLoading ||
    scoutRoleLoading ||
    pmScoutRoleLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('users:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <UsersFilterForm
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
          clubsData={clubs || []}
          regionsData={regions || []}
          userFootballRolesData={userFootballRoles || []}
        />
      </FilterAccordion>
      <UsersTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={users?.totalDocs || 0}
        actions
        data={users?.docs || []}
        onSetPlaymakerScoutClick={setPMScoutRole}
        onSetScoutClick={setScoutRole}
      />
    </>
  )
}

export default UsersPage

import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useClubsList } from '@/modules/clubs/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { useDeleteScoutProfile } from '@/modules/scout-profile/hooks'
import { ScoutProfilesTable } from '@/modules/scout-profile/table/table'
import { useUserFootballRolesList } from '@/modules/user-football-roles/hooks'
import { UsersFilterForm } from '@/modules/users/forms/filter'
import { useUsers } from '@/modules/users/hooks'
import { UsersFiltersState, UsersSortBy } from '@/modules/users/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: UsersFiltersState = {
  clubIds: [],
  footballRoleIds: [],
  name: '',
  regionIds: [],
  roles: [],
  hasScoutProfile: true,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'scout-profiles'],
  ['ADMIN'],
)

const ScoutProfilesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<{ id: string }>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('scoutProfilesTable')

  const [filters, setFilters] = useLocalStorage<UsersFiltersState>({
    key: 'scout-profiles-filters',
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
    ...mapFiltersStateToDto({ ...filters, hasScoutProfile: true }),
  })

  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { data: regions, isLoading: regionsLoading } = useRegionsList()
  const { data: userFootballRoles, isLoading: userFootballRolesLoading } =
    useUserFootballRolesList()

  const { mutate: deleteProfile, isLoading: deleteLoading } =
    useDeleteScoutProfile()

  const isLoading =
    dataLoading ||
    clubsLoading ||
    regionsLoading ||
    userFootballRolesLoading ||
    deleteLoading

  const handleDeleteItemClick = (id: string) => {
    setToDeleteData({ id })
    setIsDeleteConfirmationModalOpen(true)
  }

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('scout-profiles:INDEX_PAGE_TITLE')} />
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
      <ScoutProfilesTable
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
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/scout-profiles/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('scout-profiles:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deleteProfile(toDeleteData.id)

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

export default ScoutProfilesPage

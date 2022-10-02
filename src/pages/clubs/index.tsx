import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { ClubsFilterForm } from '@/modules/clubs/forms/filter'
import { useClubs, useDeleteClub } from '@/modules/clubs/hooks'
import { ClubsTable } from '@/modules/clubs/table/table'
import { ClubsFiltersDto, ClubsSortBy } from '@/modules/clubs/types'
import { useCountriesList } from '@/modules/countries/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'clubs'], false)

const initialFilters: ClubsFiltersDto = {
  name: '',
  countryId: '',
  regionId: '',
}

interface IClubToDeleteData {
  id: string
  name: string
}

const ClubsPage = () => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [clubToDeleteData, setClubToDeleteData] =
    useState<IClubToDeleteData | null>(null)

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('clubs-table')

  const [filters, setFilters] = useLocalStorage<ClubsFiltersDto>({
    key: 'clubs-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ClubsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountriesList()

  const { data: regions, isLoading: regionsLoading } = useRegionsList()

  const { data: clubs, isLoading: clubsLoading } = useClubs({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as ClubsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteClub, isLoading: deleteClubLoading } = useDeleteClub()

  return (
    <>
      {(clubsLoading ||
        countriesLoading ||
        regionsLoading ||
        deleteClubLoading) && <Loader />}
      <PageHeading title={t('clubs:INDEX_PAGE_TITLE')} />
      <ClubsFilterForm
        filters={filters}
        countriesData={countries || []}
        regionsData={regions || []}
        onFilter={handleSetFilters}
        onClearFilters={() => handleSetFilters(initialFilters)}
      />
      <ClubsTable
        data={clubs?.docs || []}
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={clubs?.totalDocs || 0}
        actions
        onDeleteClick={(id, name) => {
          setClubToDeleteData({ id, name })
          setIsDeleteConfirmationModalOpen(true)
        }}
      />
      <Fab href="/clubs/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('clubs:DELETE_CLUB_CONFIRM_QUESTION', {
          name: clubToDeleteData?.name,
        })}
        handleAccept={() => {
          if (clubToDeleteData) {
            deleteClub(clubToDeleteData.id)
          }
          setClubToDeleteData(null)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setClubToDeleteData(null)
        }}
      />
    </>
  )
}

export default ClubsPage

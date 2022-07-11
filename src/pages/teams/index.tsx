import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { withSessionSsr } from '@/lib/session'
import { redirectToLogin } from '@/utils/redirect-to-login'
import { useTable } from '@/lib/use-table'
import { useLocalStorage } from '@/lib/use-local-storage'
import { ClubsFiltersDto, ClubsSortBy } from '@/types/clubs'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useClubs, useClubsList, useDeleteClub } from '@/lib/clubs'
import { ClubsFilterForm } from '@/components/forms/club/clubs-filter-form'
import { useCountriesList } from '@/lib/countries'
import { useRegionsList } from '@/lib/regions'
import { ClubsTable } from '@/components/tables/clubs'
import { ClubsTableRow } from '@/components/tables/rows/clubs-row'
import { Fab } from '@/components/fab/fab'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { Loader } from '@/components/loader/loader'
import { TeamsFiltersDto } from '@/types/teams'
import { TeamsFilterForm } from '@/components/forms/team/teams-filter-form'
import { useCompetitionsList } from '@/lib/competitions'
import { useCompetitionGroupsList } from '@/lib/competition-groups'

export const getServerSideProps = withSessionSsr(
  async ({ locale, req, res }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'teams',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const initialFilters: TeamsFiltersDto = {
  name: '',
  clubId: '',
  competitionGroupIds: [],
  competitionIds: [],
  countryIds: [],
  isLiked: false,
  regionIds: [],
}

interface ITeamToDeleteData {
  id: string
  name: string
}

const TeamsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [teamToDeleteData, setTeamToDeleteData] =
    useState<ITeamToDeleteData | null>(null)

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('teams-table')

  const [filters, setFilters] = useLocalStorage<ClubsFiltersDto>({
    key: 'teams-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ClubsFiltersDto) {
    setFilters(newFilters)
    console.log({ newFilters })
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountriesList()
  const { data: regions, isLoading: regionsLoading } = useRegionsList()
  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()

  const { data: asd, isLoading: asdloading } = useClubs({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as ClubsSortBy,
    sortingOrder: order,
    // ...filters,
  })

  const { mutate: deleteClub, isLoading: deleteClubLoading } = useDeleteClub()

  const isLoading =
    clubsLoading ||
    countriesLoading ||
    regionsLoading ||
    deleteClubLoading ||
    competitionsLoading ||
    competitionGroupsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('teams:INDEX_PAGE_TITLE')} />
      <TeamsFilterForm
        filters={filters}
        countriesData={countries || []}
        regionsData={regions || []}
        competitionsData={competitions || []}
        competitionGroupsData={competitionGroups || []}
        clubsData={clubs || []}
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
        total={asd?.totalDocs || 0}
        actions
      >
        {asd
          ? asd.docs.map(club => (
              <ClubsTableRow
                key={club.id}
                data={club}
                onEditClick={() => {
                  router.push(`/teams/edit/${club.slug}`)
                }}
                onDeleteClick={() => {
                  setTeamToDeleteData({ id: club.id, name: club.name })
                  setIsDeleteConfirmationModalOpen(true)
                }}
                isEditOptionEnabled
                isDeleteOptionEnabled
              />
            ))
          : null}
      </ClubsTable>
      <Fab href="/teams/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('teams:DELETE_CLUB_CONFIRM_QUESTION', {
          name: teamToDeleteData?.name,
        })}
        handleAccept={() => {
          deleteClub(teamToDeleteData?.id || '')
          setTeamToDeleteData(null)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setTeamToDeleteData(null)
        }}
      />
    </>
  )
}

export default TeamsPage

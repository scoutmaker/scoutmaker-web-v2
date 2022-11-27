import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useClubsList } from '@/modules/clubs/hooks'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useCountriesList } from '@/modules/countries/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { TeamsFilterForm } from '@/modules/teams/forms/filter'
import {
  useDeleteTeam,
  useLikeTeam,
  useTeams,
  useUnlikeTeam,
} from '@/modules/teams/hooks'
import { TeamsTable } from '@/modules/teams/table/teams'
import { TeamsFiltersState, TeamsSortBy } from '@/modules/teams/types'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'teams'], false)

const initialFilters: TeamsFiltersState = {
  name: '',
  clubId: null,
  competitionGroupIds: [],
  competitionIds: [],
  countryIds: [],
  isLiked: false,
  regionIds: [],
}

const TeamsPage = () => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [teamToDeleteData, setTeamToDeleteData] = useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('teams-table')

  const [filters, setFilters] = useLocalStorage<TeamsFiltersState>({
    key: 'teams-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: TeamsFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountriesList()
  const { data: regions, isLoading: regionsLoading } = useRegionsList()
  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()

  const { data: teams, isLoading: teamsLoading } = useTeams({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as TeamsSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { mutate: deleteTeam, isLoading: deleteTeamLoading } = useDeleteTeam()
  const { mutate: likeTeam, isLoading: likeTeamLoading } = useLikeTeam()
  const { mutate: unlikeTeam, isLoading: unlikeTeamLoading } = useUnlikeTeam()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setTeamToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    clubsLoading ||
    countriesLoading ||
    regionsLoading ||
    deleteTeamLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    teamsLoading ||
    likeTeamLoading ||
    unlikeTeamLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('teams:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
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
      </FilterAccordion>
      <TeamsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={teams?.totalDocs || 0}
        actions
        data={teams?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
        onLikeClick={likeTeam}
        onUnLikeClick={unlikeTeam}
      />
      <Fab href="/teams/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('teams:DELETE_TEAM_CONFIRM_QUESTION', {
          name: teamToDeleteData?.name,
        })}
        handleAccept={() => {
          if (teamToDeleteData) {
            deleteTeam(teamToDeleteData.id)
          }
          setTeamToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setTeamToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default TeamsPage

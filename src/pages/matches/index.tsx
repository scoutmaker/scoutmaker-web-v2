import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { MatchesFilterForm } from '@/modules/matches/forms/filter'
import { useDeleteMatch, useMatches } from '@/modules/matches/hooks'
import { MatchesTable } from '@/modules/matches/table/table'
import { MatchesFiltersState, MatchesSortBy } from '@/modules/matches/types'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'matches'],
  false,
)

const initialFilters: MatchesFiltersState = {
  competitionIds: [],
  groupIds: [],
  hasVideo: false,
  seasonId: null,
  teamId: null,
}

const initialSortBy: MatchesSortBy = 'updatedAt'

const MatchesPage = () => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [matchToDeleteData, setMatchToDeleteData] =
    useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('matches-table', initialSortBy)

  const [filters, setFilters] = useLocalStorage<MatchesFiltersState>({
    key: 'matches-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: MatchesFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: seasons, isLoading: seasonsLoading } = useSeasonsList()

  const { data: matches, isLoading: matchesLoading } = useMatches({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as MatchesSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { mutate: deleteMatch, isLoading: deleteMatchLoading } =
    useDeleteMatch()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setMatchToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const onClearFilters = () => {
    handleSetFilters(initialFilters)
    handleSort(initialSortBy, 'desc')
  }

  const isLoading =
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    matchesLoading ||
    seasonsLoading ||
    deleteMatchLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('matches:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <MatchesFilterForm
          filters={filters}
          teamsData={teams || []}
          competitionsData={competitions || []}
          competitionGroupsData={competitionGroups || []}
          seasonsData={seasons || []}
          onFilter={handleSetFilters}
          onClearFilters={onClearFilters}
        />
      </FilterAccordion>
      <MatchesTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={matches?.totalDocs || 0}
        actions
        data={matches?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/matches/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('matches:DELETE_MATCH_CONFIRM_QUESTION', {
          name: matchToDeleteData?.name,
        })}
        handleAccept={() => {
          if (matchToDeleteData) {
            deleteMatch(matchToDeleteData.id)
          }
          setMatchToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setMatchToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default MatchesPage

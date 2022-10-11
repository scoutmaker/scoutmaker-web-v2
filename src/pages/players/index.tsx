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
import { useCountriesList } from '@/modules/countries/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { PlayersFilterForm } from '@/modules/players/forms/filter'
import {
  useDeletePlayer,
  useLikePlayer,
  usePlayers,
  useUnlikePlayer,
} from '@/modules/players/hooks'
import { PlayersTable } from '@/modules/players/table/table'
import { PlayersFiltersState, PlayersSortBy } from '@/modules/players/types'
import { useTeamsList } from '@/modules/teams/hooks'
import { INameToDeleteData } from '@/types/tables'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'players'],
  false,
)

const initialFilters: PlayersFiltersState = {
  name: '',
  bornAfter: 1980,
  bornBefore: 2005,
  footed: '',
  competitionGroupIds: [],
  competitionIds: [],
  countryIds: [],
  positionIds: [],
  teamIds: [],
  isLiked: false,
}

const PlayersPage = () => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [playerToDeleteData, setPlayerToDeleteData] =
    useState<INameToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('players-table')

  const [filters, setFilters] = useLocalStorage<PlayersFiltersState>({
    key: 'players-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: PlayersFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: countries, isLoading: countriesLoading } = useCountriesList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()

  const { data: players, isLoading: playersLoading } = usePlayers({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as PlayersSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { mutate: deletePlayer, isLoading: deletePlayerLoading } =
    useDeletePlayer()
  const { mutate: likePlayer, isLoading: likePlayerLoading } = useLikePlayer()
  const { mutate: unlikePlayer, isLoading: unlikePlayerLoading } =
    useUnlikePlayer()

  const handleDeleteItemClick = (data: INameToDeleteData) => {
    setPlayerToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    countriesLoading ||
    teamsLoading ||
    deletePlayerLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    playersLoading ||
    likePlayerLoading ||
    unlikePlayerLoading ||
    positionsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('players:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <PlayersFilterForm
          filters={filters}
          countriesData={countries || []}
          positionsData={positions || []}
          competitionsData={competitions || []}
          competitionGroupsData={competitionGroups || []}
          teamsData={teams || []}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <PlayersTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={players?.totalDocs || 0}
        actions
        data={players?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
        onLikeClick={likePlayer}
        onUnLikeClick={unlikePlayer}
      />
      <Fab href="/players/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('players:DELETE_PLAYER_CONFIRM_QUESTION', {
          name: playerToDeleteData?.name,
        })}
        handleAccept={() => {
          if (playerToDeleteData) {
            deletePlayer(playerToDeleteData.id)
          }
          setPlayerToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setPlayerToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default PlayersPage

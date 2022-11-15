import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { mapFiltersStateToDto } from '@/components/combo/utils'
import { ErrorContent } from '@/components/error/error-content'
import { Fab } from '@/components/fab/fab'
import FilterAccordion from '@/components/filter-accordion/filter-accordion'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useMatchesList } from '@/modules/matches/hooks'
import { PlayerStatsFilterForm } from '@/modules/player-stats/forms/filter'
import {
  useDeletePlayerStats,
  usePlayerStats,
} from '@/modules/player-stats/hooks'
import { PlayerStatsTable } from '@/modules/player-stats/table/table'
import {
  PlayerStatsFiltersState,
  PlayerStatsSortBy,
} from '@/modules/player-stats/types'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

const initialFilters: PlayerStatsFiltersState = {
  matchId: null,
  playerId: null,
  teamId: null,
}

export const getServerSideProps = withSessionSsrRole(
  ['common', 'player-stats'],
  ['ADMIN'],
)

interface IToDeleteData {
  id: string
}

const PlayerStatsPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [toDeleteData, setToDeleteData] = useState<IToDeleteData>()

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('playerstatsTable')

  const [filters, setFilters] = useLocalStorage<PlayerStatsFiltersState>({
    key: 'player-stats-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: PlayerStatsFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: playerStats, isLoading: dataLoading } = usePlayerStats({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as PlayerStatsSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { data: matchesData, isLoading: matchesLoading } = useMatchesList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const { mutate: deletePlayerStat, isLoading: deleteLoading } =
    useDeletePlayerStats()

  const handleDeleteItemClick = (data: IToDeleteData) => {
    setToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    dataLoading ||
    deleteLoading ||
    matchesLoading ||
    playersLoading ||
    teamsLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-stats:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <PlayerStatsFilterForm
          matchesData={matchesData || []}
          playersData={playersData || []}
          teamsData={teamsData || []}
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <PlayerStatsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={playerStats?.totalDocs || 0}
        actions
        data={playerStats?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
      />
      <Fab href="/player-stats/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('player-stats:DELETE_CONFIRM_QUESTION')}
        handleAccept={() => {
          if (toDeleteData) deletePlayerStat(toDeleteData.id)

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

export default PlayerStatsPage

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import { Fab } from '@/components/fab/fab'
import { PlayersFilterForm } from '@/components/forms/player/players-filter-form'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { PlayersTable } from '@/components/tables/players'
import { PlayersTableRow } from '@/components/tables/rows/players-row'
import { useCompetitionGroupsList } from '@/lib/competition-groups'
import { useCompetitionsList } from '@/lib/competitions'
import { useCountriesList } from '@/lib/countries'
import { usePlayerPositionsList } from '@/lib/player-positions'
import { withSessionSsr } from '@/lib/session'
import { useTeamsList } from '@/lib/teams'
import {
  useDeletePlayer,
  useLikePlayer,
  usePlayers,
  useUnlikePlayer,
} from '@/modules/players/hooks'
import { PlayersFiltersDto, PlayersSortBy } from '@/modules/players/types'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(
  async ({ locale, req, res }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'players',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const initialFilters: PlayersFiltersDto = {
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

interface IPlayerToDeleteData {
  id: number
  name: string
}

const PlayersPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [playerToDeleteData, setPlayerToDeleteData] =
    useState<IPlayerToDeleteData | null>(null)

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('players-table')

  const [filters, setFilters] = useLocalStorage<PlayersFiltersDto>({
    key: 'players-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: PlayersFiltersDto) {
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
    ...filters,
  })

  const { mutate: deletePlayer, isLoading: deletePlayerLoading } =
    useDeletePlayer()
  const { mutate: likePlayer, isLoading: likePlayerLoading } = useLikePlayer()
  const { mutate: unlikePlayer, isLoading: unlikePlayerLoading } =
    useUnlikePlayer()

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
      >
        {players
          ? players.docs.map(player => (
              <PlayersTableRow
                key={player.id}
                data={player}
                onEditClick={() => {
                  router.push(`/players/edit/${player.slug}`)
                }}
                onDeleteClick={() => {
                  setPlayerToDeleteData({
                    id: player.id,
                    name: `${player.firstName} ${player.lastName}`,
                  })
                  setIsDeleteConfirmationModalOpen(true)
                }}
                onLikeClick={(id: number) => likePlayer(id)}
                onUnlikeClick={(id: number) => unlikePlayer(id)}
                isEditOptionEnabled
                isDeleteOptionEnabled
              />
            ))
          : null}
      </PlayersTable>
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
          setPlayerToDeleteData(null)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setPlayerToDeleteData(null)
        }}
      />
    </>
  )
}

export default PlayersPage

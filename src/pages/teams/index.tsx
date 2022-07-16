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
import { useClubsList } from '@/lib/clubs'
import { useCountriesList } from '@/lib/countries'
import { useRegionsList } from '@/lib/regions'
import { Fab } from '@/components/fab/fab'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { Loader } from '@/components/loader/loader'
import { TeamsFiltersDto } from '@/types/teams'
import { TeamsFilterForm } from '@/components/forms/team/teams-filter-form'
import { useCompetitionsList } from '@/lib/competitions'
import { useCompetitionGroupsList } from '@/lib/competition-groups'
import {
  useDeleteTeam,
  useLikeTeam,
  useTeams,
  useUnlikeTeam,
} from '@/lib/teams'
import { TeamsTableRow } from '@/components/tables/rows/teams-row'
import { TeamsTable } from '@/components/tables/teams'

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
    sortBy: sortBy as ClubsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteTeam, isLoading: deleteTeamLoading } = useDeleteTeam()
  const { mutate: likeTeam, isLoading: likeTeamLoading } = useLikeTeam()
  const { mutate: unlikeTeam, isLoading: unlikeTeamLoading } = useUnlikeTeam()

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
      >
        {teams
          ? teams.docs.map(team => (
              <TeamsTableRow
                key={team.id}
                data={team}
                onEditClick={() => {
                  router.push(`/teams/edit/${team.slug}`)
                }}
                onDeleteClick={() => {
                  setTeamToDeleteData({ id: team.id, name: team.name })
                  setIsDeleteConfirmationModalOpen(true)
                }}
                onLikeClick={(id: string) => likeTeam(id)}
                onUnlikeClick={(id: string) => unlikeTeam(id)}
                isEditOptionEnabled
                isDeleteOptionEnabled
              />
            ))
          : null}
      </TeamsTable>
      <Fab href="/teams/create" />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('teams:DELETE_TEAM_CONFIRM_QUESTION', {
          name: teamToDeleteData?.name,
        })}
        handleAccept={() => {
          deleteTeam(teamToDeleteData?.id || '')
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

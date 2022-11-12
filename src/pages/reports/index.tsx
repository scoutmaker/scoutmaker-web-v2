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
import { useMatchesList } from '@/modules/matches/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { ReportsFilterForm } from '@/modules/reports/forms/filter'
import {
  useDeleteReport,
  useLikeReport,
  useReports,
  useUnlikeReport,
} from '@/modules/reports/hooks'
import { ReportsTable } from '@/modules/reports/table/table'
import { ReportsFiltersState, ReportsSortBy } from '@/modules/reports/types'
import { useTeamsList } from '@/modules/teams/hooks'
import { getDocumentNumber } from '@/utils/get-document-number'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { getCreateRoute, Routes } from '@/utils/routes'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'reports'],
  false,
)

const initialFilters: ReportsFiltersState = {
  competitionGroupIds: [],
  competitionIds: [],
  isLiked: false,
  matchIds: [],
  playerBornAfter: 1980,
  playerBornBefore: 2005,
  playerIds: [],
  positionIds: [],
  teamIds: [],
  hasVideo: false,
  ratingRange: 'ALL',
  onlyLikedPlayers: false,
  onlyLikedTeams: false,
}

interface IReportToDeleteData {
  id: string
  docNumber: number
  createdAt: string
}

const ReportsPage = () => {
  const { t } = useTranslation(['common', 'reports'])

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [reportToDeleteData, setReportToDeleteData] =
    useState<IReportToDeleteData>()

  const [filterLikedTeams, setLikedTeams] = useState(false)
  const [filterLikedPlayers, setLikedPlayers] = useState(false)

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('reports-table')

  const [filters, setFilters] = useLocalStorage<ReportsFiltersState>({
    key: 'reports-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ReportsFiltersState) {
    setLikedTeams(!!newFilters.onlyLikedTeams)
    setLikedPlayers(!!newFilters.onlyLikedPlayers)
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: teams, isLoading: teamsLoading } = useTeamsList({
    isLiked: filterLikedTeams,
  })
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { data: players, isLoading: playersLoading } = usePlayersList({
    isLiked: filterLikedPlayers,
  })
  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()

  const { data: reports, isLoading: reportsLoading } = useReports({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as ReportsSortBy,
    sortingOrder: order,
    ...mapFiltersStateToDto(filters),
  })

  const { mutate: deleteReport, isLoading: deleteReportLoading } =
    useDeleteReport()
  const { mutate: likeReport, isLoading: likeReportLoading } = useLikeReport()
  const { mutate: unlikeReport, isLoading: unlikeReportLoading } =
    useUnlikeReport()

  const handleDeleteItemClick = (data: IReportToDeleteData) => {
    setReportToDeleteData(data)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    reportsLoading ||
    deleteReportLoading ||
    matchesLoading ||
    playersLoading ||
    positionsLoading ||
    likeReportLoading ||
    unlikeReportLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('reports:INDEX_PAGE_TITLE')} />
      <FilterAccordion>
        <ReportsFilterForm
          filters={filters}
          matchesData={matches || []}
          playersData={players || []}
          positionsData={positions || []}
          teamsData={teams || []}
          competitionsData={competitions || []}
          competitionGroupsData={competitionGroups || []}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
      </FilterAccordion>
      <ReportsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={reports?.totalDocs || 0}
        actions
        data={reports?.docs || []}
        handleDeleteItemClick={handleDeleteItemClick}
        onLikeClick={likeReport}
        onUnLikeClick={unlikeReport}
      />
      <Fab href={getCreateRoute(Routes.REPORTS)} />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('reports:DELETE_REPORT_CONFIRM_QUESTION', {
          number: reportToDeleteData
            ? getDocumentNumber({
                docNumber: reportToDeleteData.docNumber,
                createdAt: reportToDeleteData.createdAt,
              })
            : null,
        })}
        handleAccept={() => {
          if (reportToDeleteData) {
            deleteReport(reportToDeleteData.id)
          }
          setReportToDeleteData(undefined)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setReportToDeleteData(undefined)
        }}
      />
    </>
  )
}

export default ReportsPage

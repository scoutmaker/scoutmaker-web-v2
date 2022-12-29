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
  useReports,
  useUnlikeReport,
} from '@/modules/reports/hooks'
import { ReportsTable } from '@/modules/reports/table/table'
import { ReportsFiltersState, ReportsSortBy } from '@/modules/reports/types'
import { useOnLikeReportClick } from '@/modules/reports/utils'
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
  playerBornAfter: '',
  playerBornBefore: '',
  playerIds: [],
  positionIds: [],
  teamIds: [],
  hasVideo: false,
  observationType: null,
  onlyLikedPlayers: false,
  onlyLikedTeams: false,
  percentageRatingRanges: [],
}

const initialSortBy: ReportsSortBy = 'createdAt'

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

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('reports-table', initialSortBy)

  const [filters, setFilters] = useLocalStorage<ReportsFiltersState>({
    key: 'reports-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ReportsFiltersState) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: teams, isLoading: teamsLoading } = useTeamsList({
    isLiked: filters.onlyLikedTeams,
  })
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { data: players, isLoading: playersLoading } = usePlayersList({
    isLiked: filters.onlyLikedPlayers,
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
  const { likeReport, likeReportLoading } = useOnLikeReportClick()
  const { mutate: unlikeReport, isLoading: unlikeReportLoading } =
    useUnlikeReport()

  const handleDeleteItemClick = (data: IReportToDeleteData) => {
    setReportToDeleteData(data)
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
          onClearFilters={onClearFilters}
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

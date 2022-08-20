import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import { Fab } from '@/components/fab/fab'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
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
import { ReportsTableRow } from '@/modules/reports/table/row'
import { ReportsTable } from '@/modules/reports/table/table'
import { ReportsFiltersDto, ReportsSortBy } from '@/modules/reports/types'
import { useTeamsList } from '@/modules/teams/hooks'
import { getDocumentNumber } from '@/utils/get-document-number'
import { useLocalStorage } from '@/utils/hooks/use-local-storage'
import { useTable } from '@/utils/hooks/use-table'
import { redirectToLogin } from '@/utils/redirect-to-login'
import { getCreateRoute, getEditRoute, Routes } from '@/utils/routes'

export const getServerSideProps = withSessionSsr(
  async ({ locale, req, res }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'reports',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const initialFilters: ReportsFiltersDto = {
  competitionGroupIds: [],
  competitionIds: [],
  isLiked: false,
  matchIds: [],
  percentageRatingRangeEnd: 100,
  percentageRatingRangeStart: 0,
  playerBornAfter: 1980,
  playerBornBefore: 2005,
  playerIds: [],
  positionIds: [],
  teamIds: [],
  hasVideo: false,
}

interface IReportToDeleteData {
  id: number
  createdAt: string
}

const ReportsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [reportToDeleteData, setReportToDeleteData] =
    useState<IReportToDeleteData | null>(null)

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('reports-table')

  const [filters, setFilters] = useLocalStorage<ReportsFiltersDto>({
    key: 'reports-filters',
    initialValue: initialFilters,
  })

  function handleSetFilters(newFilters: ReportsFiltersDto) {
    setFilters(newFilters)
    handleChangePage(null, 0)
  }

  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { data: players, isLoading: playersLoading } = usePlayersList()
  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()

  const { data: reports, isLoading: reportsLoading } = useReports({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: sortBy as ReportsSortBy,
    sortingOrder: order,
    ...filters,
  })

  const { mutate: deleteReport, isLoading: deleteReportLoading } =
    useDeleteReport()
  const { mutate: likeReport, isLoading: likeReportLoading } = useLikeReport()
  const { mutate: unlikeReport, isLoading: unlikeReportLoading } =
    useUnlikeReport()

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
      >
        {reports
          ? reports.docs.map(report => (
              <ReportsTableRow
                key={report.id}
                data={report}
                onEditClick={() => {
                  router.push(getEditRoute(Routes.REPORTS, report.id))
                }}
                onDeleteClick={() => {
                  setReportToDeleteData({
                    id: report.id,
                    createdAt: report.createdAt,
                  })
                  setIsDeleteConfirmationModalOpen(true)
                }}
                onLikeClick={(id: number) => likeReport(id)}
                onUnlikeClick={(id: number) => unlikeReport(id)}
                isEditOptionEnabled
                isDeleteOptionEnabled
              />
            ))
          : null}
      </ReportsTable>
      <Fab href={getCreateRoute(Routes.REPORTS)} />
      <ConfirmationModal
        open={isDeleteConfirmationModalOpen}
        message={t('reports:DELETE_REPORT_CONFIRM_QUESTION', {
          number: reportToDeleteData
            ? getDocumentNumber({
                id: reportToDeleteData.id,
                createdAt: reportToDeleteData.createdAt,
              })
            : null,
        })}
        handleAccept={() => {
          if (reportToDeleteData) {
            deleteReport(reportToDeleteData.id)
          }
          setReportToDeleteData(null)
        }}
        handleClose={() => {
          setIsDeleteConfirmationModalOpen(false)
          setReportToDeleteData(null)
        }}
      />
    </>
  )
}

export default ReportsPage

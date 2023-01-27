import { Add as AddIcon } from '@mui/icons-material'
import { AppBar, Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'
import { PageHeading } from '@/components/page-heading/page-heading'
import { TabPanel } from '@/components/tab-panel/tab-panel'
import { useUser } from '@/modules/auth/hooks'
import {
  useInsiderNotes,
  useLikeInsiderNote,
  useUnLikeInsiderNote,
} from '@/modules/insider-notes/hooks'
import { InsiderNotesTable } from '@/modules/insider-notes/table/table'
import { InsiderNotesSortBy } from '@/modules/insider-notes/types'
import { useNotes, useUnlikeNote } from '@/modules/notes/hooks'
import { NotesTable } from '@/modules/notes/table/table'
import { NotesSortBy } from '@/modules/notes/types'
import { useOnLikeNoteClick } from '@/modules/notes/utils'
import { PlayerDetialsCard } from '@/modules/players/details-card'
import generateObservationsInfo from '@/modules/players/generate-observations-info'
import { PlayerDto } from '@/modules/players/types'
import { shouldShowPlayerRole } from '@/modules/players/utils'
import {
  useDeleteReport,
  useReports,
  useUnlikeReport,
} from '@/modules/reports/hooks'
import { ReportsTable } from '@/modules/reports/table/table'
import { ReportsSortBy } from '@/modules/reports/types'
import { useOnLikeReportClick } from '@/modules/reports/utils'
import { useTeamAffiliations } from '@/modules/team-affiliations/hooks'
import { TeamAffiliationsTable } from '@/modules/team-affiliations/table/team'
import { TeamAffiliationsSortBy } from '@/modules/team-affiliations/types'
import { getPlayerBySlug } from '@/services/api/methods/players'
import { ApiError } from '@/services/api/types'
import { getDocumentNumber } from '@/utils/get-document-number'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

interface IReportToDeleteData {
  id: string
  docNumber: number
  createdAt: string
}

export const getServerSideProps = withSessionSsrRole<PlayerDto>(
  ['common', 'players', 'reports'],
  false,
  async (token, params) => {
    try {
      const data = await getPlayerBySlug(params?.slug as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const PlayerPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerDto>) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [tabValue, setTabValue] = useState(0)

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)
  const [reportToDeleteData, setReportToDeleteData] =
    useState<IReportToDeleteData>()

  const handleTabChange = (event: any, newValue: number) =>
    setTabValue(newValue)

  const { _count: playerObservations } = data || {}

  const {
    tableSettings: TeamAffiliationsTableSettings,
    ...TeamAffiliationsTableProps
  } = useTable(`team-affiliations-table-player:${data?.id}`, 'endDate')

  const { tableSettings: NotesTableSettings, ...NotesTableProps } = useTable(
    `notes-table-players`,
    'createdAt',
  )

  const { tableSettings: ReportsTableSettings, ...ReportsTableProps } =
    useTable(`reports-table-players`, 'createdAt')

  const {
    tableSettings: InsiderNotesTableSettings,
    ...InsiderNotesTableProps
  } = useTable(`insider-notes-table-players`, 'createdAt')

  const { data: affiliations, isLoading: teamAffiliationsLoading } =
    useTeamAffiliations({
      page: TeamAffiliationsTableSettings.page + 1,
      limit: TeamAffiliationsTableSettings.rowsPerPage,
      sortBy: TeamAffiliationsTableSettings.sortBy as TeamAffiliationsSortBy,
      sortingOrder: TeamAffiliationsTableSettings.order,
      playerId: data?.id,
    })

  const { data: notes, isLoading: notesLoading } = useNotes({
    page: NotesTableSettings.page + 1,
    limit: NotesTableSettings.rowsPerPage,
    sortBy: NotesTableSettings.sortBy as NotesSortBy,
    sortingOrder: NotesTableSettings.order,
    playerIds: [data?.id || ''],
  })

  const { data: reports, isLoading: reportsLoading } = useReports({
    page: ReportsTableSettings.page + 1,
    limit: ReportsTableSettings.rowsPerPage,
    sortBy: ReportsTableSettings.sortBy as ReportsSortBy,
    sortingOrder: ReportsTableSettings.order,
    playerIds: [data?.id || ''],
  })

  const { data: insiderNotes, isLoading: insiderNotesLoading } =
    useInsiderNotes({
      page: InsiderNotesTableSettings.page + 1,
      limit: InsiderNotesTableSettings.rowsPerPage,
      sortBy: InsiderNotesTableSettings.sortBy as InsiderNotesSortBy,
      sortingOrder: InsiderNotesTableSettings.order,
      playerIds: [data?.id || ''],
    })

  const { likeNote, likeNoteLoading } = useOnLikeNoteClick()
  const { mutate: unLikeNote, isLoading: unLikeNoteLoading } = useUnlikeNote()

  const { likeReport, likeReportLoading } = useOnLikeReportClick()
  const { mutate: unLikeReport, isLoading: unLikeReportLoading } =
    useUnlikeReport()

  const { mutate: likeInsiderNote, isLoading: likeInsiderNoteLoading } =
    useLikeInsiderNote()
  const { mutate: unLikeInsiderNote, isLoading: unLikeInsiderNoteLoading } =
    useUnLikeInsiderNote()

  const { data: user, isLoading: userLoading } = useUser()

  const observationsAccessInfo = generateObservationsInfo(user, t)

  const { mutate: deleteReport, isLoading: deleteReportLoading } =
    useDeleteReport()

  const handleDeleteReportClick = (deleteData: IReportToDeleteData) => {
    setReportToDeleteData(deleteData)
    setIsDeleteConfirmationModalOpen(true)
  }

  const isLoading =
    likeNoteLoading ||
    unLikeNoteLoading ||
    likeReportLoading ||
    unLikeReportLoading ||
    likeInsiderNoteLoading ||
    unLikeInsiderNoteLoading ||
    teamAffiliationsLoading ||
    notesLoading ||
    reportsLoading ||
    insiderNotesLoading ||
    userLoading ||
    deleteReportLoading

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={`${data.firstName} ${data.lastName}`} />
      <PlayerDetialsCard player={data} showRole={shouldShowPlayerRole(user)} />
      <Box width="100%" marginTop={theme => theme.spacing(4)}>
        <AppBar
          position="static"
          sx={theme => ({
            marginBottom: theme.spacing(1),
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          })}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="teams-notes-reports-tab"
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            sx={theme => ({
              '& .MuiTab-root': {
                [theme.breakpoints.down('sm')]: {
                  fontSize: 10,
                },
              },
            })}
            centered
          >
            <Tab label={`${t('NOTES')} (${playerObservations?.notes || 0})`} />
            <Tab
              label={`${t('INSIDER_NOTES')} (${insiderNotes?.totalDocs || 0})`}
            />
            <Tab
              label={`${t('REPORTS')} (${playerObservations?.reports || 0})`}
            />
            <Tab
              label={`${t('TEAM_AFFILIATIONS')} (${
                affiliations?.totalDocs || 0
              })`}
            />
          </Tabs>
        </AppBar>
        {((playerObservations?.notes !== notes?.totalDocs && tabValue === 0) ||
          (playerObservations?.reports !== reports?.totalDocs &&
            tabValue === 2)) && (
          <Typography
            variant="h6"
            component="h4"
            textAlign="center"
            paddingBottom={0.5}
          >
            {observationsAccessInfo}
          </Typography>
        )}
        <TabPanel value={tabValue} index={0} title="notes" noPadding>
          <NotesTable
            {...NotesTableSettings}
            {...NotesTableProps}
            total={notes?.totalDocs || 0}
            data={notes?.docs || []}
            onLikeClick={likeNote}
            onUnLikeClick={unLikeNote}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1} title="insider-notes" noPadding>
          <InsiderNotesTable
            {...InsiderNotesTableProps}
            {...InsiderNotesTableSettings}
            total={insiderNotes?.totalDocs || 0}
            data={insiderNotes?.docs || []}
            likeInsiderNoteClick={likeInsiderNote}
            unLikeInsiderNoteClick={unLikeInsiderNote}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2} title="reports" noPadding>
          <ReportsTable
            {...ReportsTableSettings}
            {...ReportsTableProps}
            total={reports?.totalDocs || 0}
            data={reports?.docs || []}
            onLikeClick={likeReport}
            onUnLikeClick={unLikeReport}
            actions
            handleDeleteItemClick={handleDeleteReportClick}
          />
        </TabPanel>
        <TabPanel
          value={tabValue}
          index={3}
          title="team-affiliations"
          noPadding
        >
          {user?.role === 'ADMIN' && (
            <Button
              variant="contained"
              disableElevation
              sx={theme => ({
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                marginBottom: -1,
                [theme.breakpoints.down('sm')]: {
                  fontSize: 11,
                },
              })}
              fullWidth
              onClick={() =>
                router.push(`/team-affiliations/create?playerId=${data.id}`)
              }
            >
              {t('ADD')} <AddIcon />
            </Button>
          )}
          <TeamAffiliationsTable
            {...TeamAffiliationsTableProps}
            {...TeamAffiliationsTableSettings}
            total={affiliations?.totalDocs || 0}
            data={affiliations?.docs || []}
          />
        </TabPanel>
      </Box>
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

export default PlayerPage

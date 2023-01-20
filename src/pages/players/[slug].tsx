import { Add as AddIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Link as MuiLink,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
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
import { PlayerDto } from '@/modules/players/types'
import { shouldShowPlayerRole } from '@/modules/players/utils'
import { useReports, useUnlikeReport } from '@/modules/reports/hooks'
import { ReportsTable } from '@/modules/reports/table/table'
import { ReportsSortBy } from '@/modules/reports/types'
import { useOnLikeReportClick } from '@/modules/reports/utils'
import { useTeamAffiliations } from '@/modules/team-affiliations/hooks'
import { TeamAffiliationsTable } from '@/modules/team-affiliations/table/team'
import { TeamAffiliationsSortBy } from '@/modules/team-affiliations/types'
import { getPlayerBySlug } from '@/services/api/methods/players'
import { ApiError } from '@/services/api/types'
import { useTable } from '@/utils/hooks/use-table'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'
import generateObservationsInfo from '@/modules/players/generate-observations-info'

type TData = {
  isAdmin: boolean
  player: PlayerDto
}

export const getServerSideProps = withSessionSsrRole<TData>(
  ['common', 'players'],
  false,
  async (token, params, user) => {
    try {
      const data = await getPlayerBySlug(params?.slug as string, token)
      return { data: { isAdmin: !!user?.role.includes('ADMIN'), player: data } }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const PlayerPage = ({ data, errorMessage, errorStatus }: TSsrRole<TData>) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: any, newValue: number) =>
    setTabValue(newValue)

  const { isAdmin, player } = data || {}
  const { _count: playerObservations } = player || {}

  const {
    tableSettings: TeamAffiliationsTableSettings,
    ...TeamAffiliationsTableProps
  } = useTable(`team-affiliations-table-player:${player?.id}`, 'endDate')

  const { tableSettings: NotesTableSettings, ...NotesTableProps } =
    useTable(`notes-table-player`)

  const { tableSettings: ReportsTableSettings, ...ReportsTableProps } =
    useTable(`reports-table-player`)

  const {
    tableSettings: InsiderNotesTableSettings,
    ...InsiderNotesTableProps
  } = useTable(`insider-notes-table-player`)

  const { data: affiliations, isLoading: teamAffiliationsLoading } =
    useTeamAffiliations({
      page: TeamAffiliationsTableSettings.page + 1,
      limit: TeamAffiliationsTableSettings.rowsPerPage,
      sortBy: TeamAffiliationsTableSettings.sortBy as TeamAffiliationsSortBy,
      sortingOrder: TeamAffiliationsTableSettings.order,
      playerId: player?.id,
    })

  const { data: notes, isLoading: notesLoading } = useNotes({
    page: NotesTableSettings.page + 1,
    limit: NotesTableSettings.rowsPerPage,
    sortBy: NotesTableSettings.sortBy as NotesSortBy,
    sortingOrder: NotesTableSettings.order,
    playerIds: [player?.id || ''],
  })

  const { data: reports, isLoading: reportsLoading } = useReports({
    page: ReportsTableSettings.page + 1,
    limit: ReportsTableSettings.rowsPerPage,
    sortBy: ReportsTableSettings.sortBy as ReportsSortBy,
    sortingOrder: ReportsTableSettings.order,
    playerIds: [player?.id || ''],
  })

  const { data: insiderNotes, isLoading: insiderNotesLoading } =
    useInsiderNotes({
      page: InsiderNotesTableSettings.page + 1,
      limit: InsiderNotesTableSettings.rowsPerPage,
      sortBy: InsiderNotesTableSettings.sortBy as InsiderNotesSortBy,
      sortingOrder: InsiderNotesTableSettings.order,
      playerIds: [player?.id || ''],
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
    userLoading

  if (!player)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={`${player.firstName} ${player.lastName}`} />
      <PlayerDetialsCard
        player={player}
        showRole={shouldShowPlayerRole(user)}
      />
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
            <Tab label={`${t('NOTES')} (${notes?.totalDocs || 0})`} />
            <Tab
              label={`${t('INSIDER_NOTES')} (${insiderNotes?.totalDocs || 0})`}
            />
            <Tab label={`${t('REPORTS')} (${reports?.totalDocs})`} />
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
          />
        </TabPanel>
        <TabPanel
          value={tabValue}
          index={3}
          title="team-affiliations"
          noPadding
        >
          {isAdmin && (
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
                router.push(`/team-affiliations/create?playerId=${player.id}`)
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
    </>
  )
}

export default PlayerPage

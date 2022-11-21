import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { TabPanel } from '@/components/tab-panel/tab-panel'
import { MatchDetailsCard } from '@/modules/matches/details-card'
import { MatchDto } from '@/modules/matches/types'
import { getMatchDisplayName } from '@/modules/matches/utils'
import { useLikeNote, useNotes, useUnlikeNote } from '@/modules/notes/hooks'
import { NotesTable } from '@/modules/notes/table/table'
import { NoteDto } from '@/modules/notes/types'
import {
  useLikeReport,
  useReports,
  useUnlikeReport,
} from '@/modules/reports/hooks'
import { ReportsTable } from '@/modules/reports/table/table'
import { ReportPaginatedDataDto } from '@/modules/reports/types'
import { getMatchById } from '@/services/api/methods/matches'
import { ApiError } from '@/services/api/types'
import { useTable } from '@/utils/hooks/use-table'
import { useTabs } from '@/utils/hooks/use-tabs'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

type CommonTabData = {
  name: string
  docCount: number
  tableSettings: ReturnType<typeof useTable>['tableSettings']
  tableHandlers: Omit<ReturnType<typeof useTable>, 'tableSettings'>
}

type NoteTabData = {
  type: 'note'
  data: NoteDto[]
} & CommonTabData

type ReportTabData = {
  type: 'report'
  data: ReportPaginatedDataDto[]
} & CommonTabData

type TabData = NoteTabData | ReportTabData

export const getServerSideProps = withSessionSsrRole<MatchDto>(
  ['common', 'matches'],
  false,
  async (token, params) => {
    try {
      const data = await getMatchById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const MatchPage = ({ data, errorMessage, errorStatus }: TSsrRole<MatchDto>) => {
  const { t } = useTranslation()
  const { activeTab, handleTabChange } = useTabs()

  const { tableSettings: homeNoteTableSettings, ...homeNotesTableProps } =
    useTable(`matches-notes-table-home`)
  const { data: homeTeamNotes, isLoading: homeTeamNotesLoading } = useNotes({
    matchIds: [data?.id || ''],
    teamIds: [data?.homeTeam.id || ''],
  })

  const { tableSettings: awayNoteTableSettings, ...awayNotesTableProps } =
    useTable(`matches-notes-table-away`)
  const { data: awayTeamNotes, isLoading: awayTeamNotesLoading } = useNotes({
    matchIds: [data?.id || ''],
    teamIds: [data?.awayTeam.id || ''],
  })

  const { tableSettings: homeReportsTableSettings, ...homeReportsTableProps } =
    useTable(`matches-reports-table-home`)
  const { data: homeTeamReports, isLoading: homeTeamReportsLoading } =
    useReports({
      matchIds: [data?.id || ''],
      teamIds: [data?.homeTeam.id || ''],
    })

  const { tableSettings: awayReportsTableSettings, ...awayReportsTableProps } =
    useTable(`matches-reports-table-away`)
  const { data: awayTeamReports, isLoading: awayTeamReportsLoading } =
    useReports({
      matchIds: [data?.id || ''],
      teamIds: [data?.awayTeam.id || ''],
    })

  const {
    tableSettings: unassignedNotesTableSettings,
    ...unassignedNotesTableProps
  } = useTable(`match-notes-table-unassigned:${data?.id}`)

  const { data: unassignedNotes, isLoading: unassignedNotesLoading } = useNotes(
    { matchIds: [data?.id || ''], onlyNullPlayers: true },
  )

  const { mutate: likeNote, isLoading: likeNoteLoading } = useLikeNote()
  const { mutate: unLikeNote, isLoading: unLikeNoteLoading } = useUnlikeNote()

  const { mutate: likeReport, isLoading: likeReportLoading } = useLikeReport()
  const { mutate: unLikeReport, isLoading: unLikeReportLoading } =
    useUnlikeReport()

  const headings = [data?.homeTeam.name, data?.awayTeam.name, t('UNASSIGNED')]
  const tabs: TabData[] = [
    {
      name: 'home-team-notes',
      type: 'note',
      data: homeTeamNotes?.docs || [],
      docCount: homeTeamNotes?.totalDocs || 0,
      tableSettings: homeNoteTableSettings,
      tableHandlers: homeNotesTableProps,
    },
    {
      name: 'home-team-reports',
      type: 'report',
      data: homeTeamReports?.docs || [],
      docCount: homeTeamReports?.totalDocs || 0,
      tableSettings: homeReportsTableSettings,
      tableHandlers: homeReportsTableProps,
    },
    {
      name: 'away-team-notes',
      type: 'note',
      data: awayTeamNotes?.docs || [],
      docCount: awayTeamNotes?.totalDocs || 0,
      tableSettings: awayNoteTableSettings,
      tableHandlers: awayNotesTableProps,
    },
    {
      name: 'away-team-reports',
      type: 'report',
      data: awayTeamReports?.docs || [],
      docCount: awayTeamReports?.totalDocs || 0,
      tableSettings: awayReportsTableSettings,
      tableHandlers: awayReportsTableProps,
    },
    {
      name: 'unassigned-notes',
      type: 'note',
      data: unassignedNotes?.docs || [],
      docCount: unassignedNotes?.totalDocs || 0,
      tableSettings: unassignedNotesTableSettings,
      tableHandlers: unassignedNotesTableProps,
    },
  ]

  const isLoading =
    homeTeamNotesLoading ||
    likeNoteLoading ||
    unLikeNoteLoading ||
    awayTeamNotesLoading ||
    homeTeamReportsLoading ||
    awayTeamReportsLoading ||
    likeReportLoading ||
    unLikeReportLoading ||
    unassignedNotesLoading

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={getMatchDisplayName({
          homeTeamName: data.homeTeam.name,
          awayTeamName: data.awayTeam.name,
        })}
      />
      <MatchDetailsCard match={data} />

      <Grid
        container
        sx={theme => ({
          bgcolor: theme.palette.primary.main,
          marginTop: theme.spacing(2),
          paddingTop: theme.spacing(1),
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        })}
      >
        {headings.map((heading, idx) => (
          <Box
            key={heading}
            sx={idx !== 2 ? { width: '40%' } : { width: '20%' }}
          >
            <Typography
              sx={theme => ({
                fontSize: 22,
                color: theme.palette.primary.contrastText,
                textAlign: 'center',
                overflowWrap: 'break-word',
                [theme.breakpoints.down('sm')]: {
                  fontSize: 16,
                },
              })}
            >
              {heading}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Box width="100%">
        <AppBar
          position="static"
          sx={theme => ({
            marginBottom: theme.spacing(1),
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          })}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="teams-notes-reports-tab"
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            {tabs.map(({ name, type, docCount }) => (
              <Tab
                key={name}
                label={`${
                  type === 'note' ? t('NOTES') : t('REPORTS')
                } (${docCount})`}
              />
            ))}
          </Tabs>
        </AppBar>
        {tabs.map(
          (
            { name, type, data: docs, docCount, tableSettings, tableHandlers },
            idx,
          ) => (
            <TabPanel
              key={name}
              value={activeTab}
              index={idx}
              title={name}
              noPadding
            >
              {type === 'note' ? (
                <NotesTable
                  {...tableSettings}
                  {...tableHandlers}
                  data={docs}
                  total={docCount}
                  onLikeClick={likeNote}
                  onUnLikeClick={unLikeNote}
                />
              ) : (
                <ReportsTable
                  {...tableSettings}
                  {...tableHandlers}
                  data={docs}
                  total={docCount}
                  onLikeClick={likeReport}
                  onUnLikeClick={unLikeReport}
                />
              )}
            </TabPanel>
          ),
        )}
      </Box>
    </>
  )
}

export default MatchPage

import { useLikeNote, useNotes, useUnlikeNote } from '@/modules/notes/hooks'
import { NoteDto, NotesSortBy } from '@/modules/notes/types'
import {
  useLikeReport,
  useReports,
  useUnlikeReport,
} from '@/modules/reports/hooks'
import { ReportPaginatedDataDto, ReportsSortBy } from '@/modules/reports/types'
import { useTable } from '@/utils/hooks/use-table'

type CommonTabData = {
  name: string
  titleI18nKey: string
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

interface IUseSingleMatchPageDataArgs {
  matchId: string
  homeTeamId: string
  awayTeamId: string
}

export function useSingleMatchPageData({
  matchId,
  homeTeamId,
  awayTeamId,
}: IUseSingleMatchPageDataArgs) {
  // Home team notes
  const {
    tableSettings: homeTeamNotesTableSettings,
    ...homeTeamNotesTableHandlers
  } = useTable(`match:${matchId}:home-team-notes-table`)

  const { data: homeTeamNotes, isLoading: homeTeamNotesLoading } = useNotes({
    matchIds: [matchId],
    teamIds: [homeTeamId],
    ...homeTeamNotesTableSettings,
    sortBy: homeTeamNotesTableSettings.sortBy as NotesSortBy,
  })

  // Away team notes
  const {
    tableSettings: awayTeamNotesTableSettings,
    ...awayTeamNotesTableHandlers
  } = useTable(`match:${matchId}:away-team-notes-table`)

  const { data: awayTeamNotes, isLoading: awayTeamNotesLoading } = useNotes({
    matchIds: [matchId],
    teamIds: [awayTeamId],
    ...awayTeamNotesTableSettings,
    sortBy: awayTeamNotesTableSettings.sortBy as NotesSortBy,
  })

  // Home team reports
  const {
    tableSettings: homeTeamReportsTableSettings,
    ...homeTeamReportsTableHandlers
  } = useTable(`match:${matchId}:home-team-reports-table`)
  const { data: homeTeamReports, isLoading: homeTeamReportsLoading } =
    useReports({
      matchIds: [matchId],
      teamIds: [homeTeamId],
      ...homeTeamReportsTableSettings,
      sortBy: homeTeamReportsTableSettings.sortBy as ReportsSortBy,
    })

  // Away team reports
  const {
    tableSettings: awayTeamReportsTableSettings,
    ...awayTeamReportsTableHandlers
  } = useTable(`match:${matchId}:away-team-reports-table`)

  const { data: awayTeamReports, isLoading: awayTeamReportsLoading } =
    useReports({
      matchIds: [matchId],
      teamIds: [awayTeamId],
      ...awayTeamReportsTableSettings,
      sortBy: awayTeamReportsTableSettings.sortBy as ReportsSortBy,
    })

  // Unassigned notes
  const {
    tableSettings: unassignedNotesTableSettings,
    ...unassignedNotesTableHandlers
  } = useTable(`match:${matchId}:unassigned-notes-table`)

  const { data: unassignedNotes, isLoading: unassignedNotesLoading } = useNotes(
    {
      matchIds: [matchId],
      onlyWithoutPlayers: true,
      ...unassignedNotesTableSettings,
      sortBy: unassignedNotesTableSettings.sortBy as NotesSortBy,
    },
  )

  // Mutations
  const { mutate: likeNote, isLoading: likeNoteLoading } = useLikeNote()
  const { mutate: unlikeNote, isLoading: unLikeNoteLoading } = useUnlikeNote()
  const { mutate: likeReport, isLoading: likeReportLoading } = useLikeReport()
  const { mutate: unlikeReport, isLoading: unLikeReportLoading } =
    useUnlikeReport()

  // Loading flag
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

  const tabs: TabData[] = [
    {
      name: 'home-team-notes',
      type: 'note',
      titleI18nKey: 'matches:HOME_TEAM_NOTES',
      data: homeTeamNotes?.docs || [],
      docCount: homeTeamNotes?.totalDocs || 0,
      tableSettings: homeTeamNotesTableSettings,
      tableHandlers: homeTeamNotesTableHandlers,
    },
    {
      name: 'home-team-reports',
      type: 'report',
      titleI18nKey: 'matches:HOME_TEAM_REPORTS',
      data: homeTeamReports?.docs || [],
      docCount: homeTeamReports?.totalDocs || 0,
      tableSettings: homeTeamReportsTableSettings,
      tableHandlers: homeTeamReportsTableHandlers,
    },
    {
      name: 'away-team-notes',
      type: 'note',
      titleI18nKey: 'matches:AWAY_TEAM_NOTES',
      data: awayTeamNotes?.docs || [],
      docCount: awayTeamNotes?.totalDocs || 0,
      tableSettings: awayTeamNotesTableSettings,
      tableHandlers: awayTeamNotesTableHandlers,
    },
    {
      name: 'away-team-reports',
      type: 'report',
      titleI18nKey: 'matches:AWAY_TEAM_REPORTS',
      data: awayTeamReports?.docs || [],
      docCount: awayTeamReports?.totalDocs || 0,
      tableSettings: awayTeamReportsTableSettings,
      tableHandlers: awayTeamReportsTableHandlers,
    },
    {
      name: 'unassigned-notes',
      type: 'note',
      titleI18nKey: 'matches:UNASSIGNED_NOTES',
      data: unassignedNotes?.docs || [],
      docCount: unassignedNotes?.totalDocs || 0,
      tableSettings: unassignedNotesTableSettings,
      tableHandlers: unassignedNotesTableHandlers,
    },
  ]

  return {
    tabs,
    likeNote,
    unlikeNote,
    likeReport,
    unlikeReport,
    isLoading,
  }
}

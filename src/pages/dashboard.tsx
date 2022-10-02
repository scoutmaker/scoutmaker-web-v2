import { styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import {
  NotesIcon,
  PlayersIcon,
  ReportsIcon,
  TeamsIcon,
} from '@/components/icons'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useUser } from '@/modules/auth/hooks'
import { CountCard } from '@/modules/dashboard/CountCard'
import { CreateCard } from '@/modules/dashboard/CreateCard'
import { NoteCard } from '@/modules/dashboard/NoteCard'
import { ReportCard } from '@/modules/dashboard/ReportCard'
import { useNotes } from '@/modules/notes/hooks'
import { usePlayers } from '@/modules/players/hooks'
import { useReports } from '@/modules/reports/hooks'
import { ReportDto } from '@/modules/reports/types'
import { useTeams } from '@/modules/teams/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<string>(
  ['common', 'dashboard'],
  false,
)

const DashboardPage = () => {
  const { t } = useTranslation()

  const { data: userData, isLoading: userDataLoading } = useUser()
  const { id: userId } = userData || {}

  const { data: players, isLoading: playersLoading } = usePlayers({})
  const { data: teams, isLoading: teamsLoading } = useTeams({})
  const { data: reports, isLoading: reportsLoading } = useReports({})
  const { data: userReports, isLoading: userReportsLoading } = useReports({
    userId,
  })
  const { data: notes, isLoading: notesLoading } = useNotes({})
  const { data: userNotes, isLoading: userNotesLoading } = useNotes({
    userId,
  })
  const { data: latestReport, isLoading: latestReportLoading } = useReports({
    limit: 1,
    sortBy: 'createdAt',
  })
  const { data: highestRatedReport, isLoading: highestRatedReportLoading } =
    useReports({
      limit: 1,
      sortBy: 'percentageRating',
    })
  const { data: latestNote, isLoading: latestNoteLoading } = useNotes({
    limit: 1,
    sortBy: 'createdAt',
  })

  const isLoading =
    playersLoading ||
    teamsLoading ||
    reportsLoading ||
    userReportsLoading ||
    notesLoading ||
    userNotesLoading ||
    latestReportLoading ||
    highestRatedReportLoading ||
    latestNoteLoading ||
    userDataLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('dashboard:INDEX_PAGE_TITLE')} />
      <Container>
        <CreateCard
          linkTo="/reports/create"
          title={t('dashboard:CREATE_REPORT')}
        />
        <CreateCard linkTo="/notes/create" title={t('dashboard:CREATE_NOTE')} />
        <CountCard
          linkTo="/players"
          title={t('dashboard:PLAYERS_COUNT')}
          icon={<PlayersIcon />}
          count={players?.totalDocs}
        />
        <CountCard
          linkTo="/teams"
          title={t('dashboard:TEAMS_COUNT')}
          icon={<TeamsIcon />}
          count={teams?.totalDocs}
        />
        <CountCard
          linkTo="/reports"
          title={t('dashboard:REPORTS_COUNT')}
          icon={<ReportsIcon />}
          count={reports?.totalDocs}
        />
        <CountCard
          linkTo="/reports"
          title={t('dashboard:USER_REPORTS_COUNT')}
          icon={<ReportsIcon />}
          count={userReports?.totalDocs}
        />
        <CountCard
          linkTo="/notes"
          title={t('dashboard:NOTES_COUNT')}
          icon={<NotesIcon />}
          count={notes?.totalDocs}
        />
        <CountCard
          linkTo="/notes"
          title={t('dashboard:USER_NOTES_COUNT')}
          icon={<NotesIcon />}
          count={userNotes?.totalDocs}
        />
      </Container>
      <Container>
        {!!latestReport?.docs.length && (
          <ReportCard
            report={latestReport.docs[0] as ReportDto}
            title={t('dashboard:LATEST_REPORT')}
          />
        )}
        {!!highestRatedReport?.docs.length && (
          <ReportCard
            report={highestRatedReport.docs[0] as ReportDto}
            title={t('dashboard:HIGHEST_RATED_REPORT')}
          />
        )}
        {!!latestNote?.docs.length && (
          <NoteCard
            note={latestNote.docs[0]}
            title={t('dashboard:LATEST_NOTE')}
          />
        )}
      </Container>
    </>
  )
}

export default DashboardPage

const Container = styled('div')(({ theme }) => ({
  display: 'grid',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}))

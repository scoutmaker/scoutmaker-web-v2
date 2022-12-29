import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { GoToMatchIcon } from '@/components/icons'
import { MatchAttendanceDto } from '@/modules/match-attendances/types'
import { getBasicMatchName } from '@/modules/matches/utils'

import { BasicCard } from '../BasicCard'
import { CountCard } from '../CountCard'
import { DashboardDto } from '../types'

export interface IBaseDashboardProps {
  data: DashboardDto
  matchAttendance: MatchAttendanceDto | null | undefined
  leaveMatchClick: () => void
  variant: 'scout' | 'playmaker-scout'
}

const BaseDashboardLayout = ({
  data,
  matchAttendance,
  leaveMatchClick,
  variant,
}: IBaseDashboardProps) => {
  const { t } = useTranslation()
  const {
    notesCount,
    recentNotesRatio,
    reportsCount,
    recentReportsRatio,
    observedMatchesCount,
    recentObservedMatchesRatio,
  } = data || {}

  const ratioTo = variant === 'scout' ? 'skautów' : 'PM-scout'

  return (
    <>
      <BasicCard
        linkTo="/reports/create"
        title={t('dashboard:CREATE_REPORT')}
        secondary
      />
      <BasicCard
        linkTo="/notes/create"
        title={t('dashboard:CREATE_NOTE')}
        secondary
      />
      <BasicCard
        linkTo={matchAttendance ? undefined : '/go-to-match'}
        title={t(matchAttendance ? 'LEAVE_MATCH' : 'GO_TO_MATCH').toUpperCase()}
        icon={<GoToMatchIcon />}
        underText={
          matchAttendance ? getBasicMatchName(matchAttendance.match) : undefined
        }
        onClick={matchAttendance ? leaveMatchClick : undefined}
        secondary
      />

      <CountGridContainer>
        <CountCardGrid
          linkTo="/reports"
          title="Twoje raporty łącznie"
          count={reportsCount}
        />
        <CountCardGrid
          linkTo="/reports"
          title={`% wszystkich raportów ${ratioTo} z ostatnich 30 dni`}
          count={recentReportsRatio}
        />
      </CountGridContainer>

      <CountGridContainer>
        <CountCardGrid
          linkTo="/notes"
          title="Twoje notatki łącznie"
          count={notesCount}
        />
        <CountCardGrid
          linkTo="/notes"
          title={`% wszystkich notatek ${ratioTo} z ostatnich 30 dni`}
          count={recentNotesRatio}
        />
      </CountGridContainer>

      <CountGridContainer>
        <CountCardGrid
          linkTo="/matches"
          title="Obejrzane mecze łącznie"
          count={observedMatchesCount}
        />
        <CountCardGrid
          linkTo="/matches"
          title={`% wszystkich meczów ${ratioTo} z ostatnich 30 dni`}
          count={recentObservedMatchesRatio}
        />
      </CountGridContainer>
    </>
  )
}

const CountGridContainer = ({ children }: { children: React.ReactNode }) => (
  <Grid container spacing={1}>
    {children}
  </Grid>
)

const CountCardGrid = (props: React.ComponentProps<typeof CountCard>) => (
  <Grid item xs={6}>
    <CountCard {...props} />
  </Grid>
)

export default BaseDashboardLayout

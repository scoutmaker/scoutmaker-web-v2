import { useTranslation } from 'next-i18next'
import CountUp from 'react-countup'

import {
  GoToMatchIcon,
  MatchesIcon,
  NotesIcon,
  ReportsIcon,
} from '@/components/icons'
import { MatchAttendanceDto } from '@/modules/match-attendances/types'
import { getBasicMatchName } from '@/modules/matches/utils'

import { BasicCard } from '../BasicCard'
import { CountCard } from '../CountCard'
import { DashboardDto } from '../types'

export interface IBaseDashboardProps {
  data: DashboardDto
  matchAttendance: MatchAttendanceDto | null | undefined
  leaveMatchClick: () => void
}

const BaseDashboardLayout = ({
  data,
  matchAttendance,
  leaveMatchClick,
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
      <CountCard
        linkTo="/reports"
        title="Liczba raportów"
        icon={<ReportsIcon />}
        count={reportsCount}
        text={precentageCountUp(recentReportsRatio)}
      />
      <CountCard
        linkTo="/notes"
        title="Liczba notatek"
        icon={<NotesIcon />}
        count={notesCount}
        text={precentageCountUp(recentNotesRatio)}
      />
      <CountCard
        linkTo="/matches"
        title="Liczba meczów"
        icon={<MatchesIcon />}
        count={observedMatchesCount}
        text={precentageCountUp(recentObservedMatchesRatio)}
      />
    </>
  )
}

// -1 for debug purposes, should be defined on render
const precentageCountUp = (value: number | undefined) => (
  <>➙ {value === 0 ? 0 : <CountUp end={value || -1} useEasing />}% z 30 dni</>
)

export default BaseDashboardLayout

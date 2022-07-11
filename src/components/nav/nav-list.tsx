import { useState } from 'react'
import {
  AccountCircle as ProfileIcon,
  Person as UserDataIcon,
  DirectionsRun as PlayersIcon,
  Security as ClubsIcon,
  Assignment as OrdersIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Create as ReportTemplatesIcon,
  PermContactCalendar as AdminIcon,
  Sports as MatchesIcon,
  Note as NotesIcon,
  Storage as DatabaseIcon,
  Visibility as ObservationIcon,
  GroupWork as TeamsIcon,
} from '@mui/icons-material'
// import { MatchButton } from './MatchButton'
// import { QuickNoteButton } from './QuickNoteButton'
import { useTranslation } from 'next-i18next'
import { useUser } from '@/lib/auth'
import { isAdmin, isPrivilegedUser } from '@/utils/user-roles'
import { StyledDivider, StyledList } from './styles'
import { ExpandeableNavElement } from './expandeable-nav-element'
import { NavElement } from './nav-element'
import { LogoutButton } from './logout-button'

// interface NavListProps {
//   handleQuickNoteClick: () => void
//   handleMatchClick: () => void
//   isAtTheMatch: boolean
// }

export const NavList = () => {
  const { t } = useTranslation()
  const { data: user } = useUser()

  const [isDatabaseListOpen, setDatabaseListOpen] = useState(false)
  const [isObservationListOpen, setObservationListOpen] = useState(false)
  const [isProfileListOpen, setProfileListOpen] = useState(false)

  return (
    <StyledList>
      <NavElement
        icon={<HomeIcon color="error" />}
        to="/dashboard"
        text={t('DASHBOARD')}
      />
      <ExpandeableNavElement
        icon={<DatabaseIcon color="error" />}
        handleClick={() => setDatabaseListOpen(!isDatabaseListOpen)}
        open={isDatabaseListOpen}
        title={t('DATABASES')}
      >
        <NavElement
          icon={<PlayersIcon color="error" />}
          to="/players"
          text={t('PLAYERS')}
        />
        <NavElement
          icon={<ClubsIcon color="error" />}
          to="/clubs"
          text={t('CLUBS')}
        />
        <NavElement
          icon={<TeamsIcon color="error" />}
          to="/teams"
          text={t('TEAMS')}
        />
        <NavElement
          icon={<MatchesIcon color="error" />}
          to="/matches"
          text={t('MATCHES')}
        />
      </ExpandeableNavElement>
      <ExpandeableNavElement
        icon={<ObservationIcon color="error" />}
        handleClick={() => setObservationListOpen(!isObservationListOpen)}
        open={isObservationListOpen}
        title={t('SCOUTING')}
      >
        <NavElement
          icon={<ReportsIcon color="error" />}
          to="/reports"
          text={t('REPORTS')}
        />
        <NavElement
          icon={<NotesIcon color="error" />}
          to="/notes"
          text={t('NOTES')}
        />
        <NavElement
          icon={<ReportTemplatesIcon color="error" />}
          to="/reporttemplates"
          text={t('REPORT_TEMPLATES_CREATOR')}
        />
      </ExpandeableNavElement>
      {isPrivilegedUser(user) ? (
        <NavElement
          icon={<OrdersIcon color="error" />}
          to="/orders"
          text={t('ORDERS')}
        />
      ) : null}
      {/* <MatchButton onClick={handleMatchClick} isAtTheMatch={isAtTheMatch} /> */}
      {/* <QuickNoteButton onClick={handleQuickNoteClick} /> */}
      {isAdmin(user) ? (
        <NavElement
          icon={<AdminIcon color="error" />}
          to="/admin"
          text={t('ADMIN_PANEL')}
        />
      ) : null}
      <StyledDivider />
      <ExpandeableNavElement
        icon={<ProfileIcon color="error" />}
        handleClick={() => setProfileListOpen(!isProfileListOpen)}
        open={isProfileListOpen}
        title={t('PROFILE')}
      >
        <NavElement
          icon={<UserDataIcon color="error" />}
          to="/account"
          text={t('USER_DATA')}
        />
        <NavElement
          icon={<SettingsIcon color="error" />}
          to="/settings"
          text={t('SETTINGS')}
        />
      </ExpandeableNavElement>
      <LogoutButton />
    </StyledList>
  )
}

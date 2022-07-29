import {
  AccountCircle as ProfileIcon,
  Assessment as ReportsIcon,
  Assignment as OrdersIcon,
  Create as ReportTemplatesIcon,
  DirectionsRun as PlayersIcon,
  GroupWork as TeamsIcon,
  Home as HomeIcon,
  Note as NotesIcon,
  PermContactCalendar as AdminIcon,
  Person as UserDataIcon,
  Security as ClubsIcon,
  Settings as SettingsIcon,
  Sports as MatchesIcon,
  Storage as DatabaseIcon,
  Visibility as ObservationIcon,
} from '@mui/icons-material'
// import { MatchButton } from './MatchButton'
// import { QuickNoteButton } from './QuickNoteButton'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { useUser } from '@/modules/auth/hooks'
import { isAdmin, isPrivilegedUser } from '@/utils/user-roles'

import { ExpandeableNavElement } from './expandeable-nav-element'
import { LogoutButton } from './logout-button'
import { NavElement } from './nav-element'
import { StyledDivider, StyledList } from './styles'

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

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
} from '@mui/icons-material'
// import { MatchButton } from './MatchButton'
// import { QuickNoteButton } from './QuickNoteButton'
import { useUser } from '../../lib/auth'
import { isAdmin, isPrivilegedUser } from '../../utils/user-roles'
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
  const { data: user } = useUser()

  const [isDatabaseListOpen, setDatabaseListOpen] = useState(false)
  const [isObservationListOpen, setObservationListOpen] = useState(false)
  const [isProfileListOpen, setProfileListOpen] = useState(false)

  return (
    <StyledList>
      <NavElement
        icon={<HomeIcon color="error" />}
        to="/dashboard"
        text="Strona główna"
      />
      <ExpandeableNavElement
        icon={<DatabaseIcon color="error" />}
        handleClick={() => setDatabaseListOpen(!isDatabaseListOpen)}
        open={isDatabaseListOpen}
        title="Bazy"
      >
        <NavElement
          icon={<PlayersIcon color="error" />}
          to="/players"
          text="Zawodnicy"
        />
        <NavElement
          icon={<ClubsIcon color="error" />}
          to="/clubs"
          text="Kluby"
        />
        <NavElement
          icon={<MatchesIcon color="error" />}
          to="/matches"
          text="Mecze"
        />
      </ExpandeableNavElement>
      <ExpandeableNavElement
        icon={<ObservationIcon color="error" />}
        handleClick={() => setObservationListOpen(!isObservationListOpen)}
        open={isObservationListOpen}
        title="Obserwacje"
      >
        <NavElement
          icon={<ReportsIcon color="error" />}
          to="/reports"
          text="Raporty"
        />
        <NavElement
          icon={<NotesIcon color="error" />}
          to="/notes"
          text="Notatki"
        />
        <NavElement
          icon={<ReportTemplatesIcon color="error" />}
          to="/reporttemplates"
          text="Kreator szablonów"
        />
      </ExpandeableNavElement>
      {isPrivilegedUser(user) ? (
        <NavElement
          icon={<OrdersIcon color="error" />}
          to="/orders"
          text="Zlecenia"
        />
      ) : null}
      {/* <MatchButton onClick={handleMatchClick} isAtTheMatch={isAtTheMatch} /> */}
      {/* <QuickNoteButton onClick={handleQuickNoteClick} /> */}
      {isAdmin(user) ? (
        <NavElement
          icon={<AdminIcon color="error" />}
          to="/admin"
          text="Panel administratora"
        />
      ) : null}
      <StyledDivider />
      <ExpandeableNavElement
        icon={<ProfileIcon color="error" />}
        handleClick={() => setProfileListOpen(!isProfileListOpen)}
        open={isProfileListOpen}
        title="Mój profil"
      >
        <NavElement
          icon={<UserDataIcon color="error" />}
          to="/account"
          text="Dane użytkownika"
        />
        <NavElement
          icon={<SettingsIcon color="error" />}
          to="/settings"
          text="Ustawienia"
        />
      </ExpandeableNavElement>
      <LogoutButton />
    </StyledList>
  )
}

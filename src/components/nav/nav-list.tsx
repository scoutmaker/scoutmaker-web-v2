// import { MatchButton } from './MatchButton'
// import { QuickNoteButton } from './QuickNoteButton'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { useUser } from '@/modules/auth/hooks'
import { isAdmin, isPrivilegedUser } from '@/utils/user-roles'

import {
  AdminIcon,
  AgeCategoryIcon,
  ClubsIcon,
  CompetitionIcon,
  CountryIcon,
  DatabaseIcon,
  HomeIcon,
  MatchesIcon,
  NotesIcon,
  ObservationIcon,
  OrdersIcon,
  PlayersIcon,
  ProfileIcon,
  RegionIcon,
  ReportsIcon,
  ReportTemplatesIcon,
  SettingsIcon,
  TeamsIcon,
  UserDataIcon,
} from '../icons'
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
  const [isAdminListOpen, setAdminListOpen] = useState(false)

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
      {isAdmin(user) && (

        <ExpandeableNavElement
          icon={<AdminIcon color="error" />}
          handleClick={() => setAdminListOpen(!isAdminListOpen)}
          open={isAdminListOpen}
          title={t('ADMIN_PANEL')}
        >
          <NavElement
            icon={<CountryIcon color="error" />}
            to="/countries"
            text={t('COUNTRIES')}
          />
          <NavElement
            icon={<AgeCategoryIcon color="error" />}
            to="/competition-age-categories"
            text={t('COMPETITION_AGE_CATEGORIES')}
          />
          <NavElement
            icon={<RegionIcon color="error" />}
            to="/regions"
            text={t('REGIONS')}
          />
          <NavElement
            icon={<CompetitionIcon color="error" />}
            to="/competitions"
            text={t('COMPETITIONS')}
          />
        </ExpandeableNavElement>
      )}
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

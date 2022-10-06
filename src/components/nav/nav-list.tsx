// import { MatchButton } from './MatchButton'
// import { QuickNoteButton } from './QuickNoteButton'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { useUser } from '@/modules/auth/hooks'
import { Routes } from '@/utils/routes'
import { isAdmin, isPrivilegedUser } from '@/utils/user-roles'

import {
  AdminIcon,
  AgeCategoryIcon,
  BallIcon,
  ClubsIcon,
  CompetitionIcon,
  CountryIcon,
  DatabaseIcon,
  HomeIcon,
  InsiderNotesIcon,
  MatchesIcon,
  NotesIcon,
  ObservationIcon,
  OrdersIcon,
  OrganizationsIcon,
  OrganizationSubscriptionsIcon,
  PlayerPositionIcon,
  PlayersIcon,
  ProfileIcon,
  RegionIcon,
  ReportBackgroundImagesIcon,
  ReportsIcon,
  ReportSkillAssessmentCategoriesIcon,
  ReportTemplatesIcon,
  SeasonIcon,
  SettingsIcon,
  TeamAffiliationIcon,
  TeamsIcon,
  TemplatesIcon,
  UserDataIcon,
  UsersIcon,
  UserSubscriptionsIcon,
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
  const [isTemplatesListOpen, setTemplatesListOpen] = useState(false)
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
          icon={<InsiderNotesIcon color="error" />}
          to="/insider-notes"
          text={t('INSIDER_NOTES')}
        />
      </ExpandeableNavElement>
      {isPrivilegedUser(user) ? (
        <NavElement
          icon={<OrdersIcon color="error" />}
          to="/orders"
          text={t('ORDERS')}
        />
      ) : null}
      <ExpandeableNavElement
        icon={<TemplatesIcon color="error" />}
        handleClick={() => setTemplatesListOpen(!isTemplatesListOpen)}
        open={isTemplatesListOpen}
        title={t('TEMPLATES')}
      >
        <NavElement
          icon={<ReportSkillAssessmentCategoriesIcon color="error" />}
          to={Routes.REPORT_SKILL_ASSESSMENT_CATEGORIES}
          text={t('REPORT_SKILL_ASSESSMENT_CATEGORIES')}
        />
        <NavElement
          icon={<ReportSkillAssessmentCategoriesIcon color="error" />}
          to={Routes.REPORT_SKILL_ASSESSMENT_TEMPLATES}
          text={t('REPORT_SKILL_ASSESSMENT_TEMPLATES')}
        />
        <NavElement
          icon={<ReportTemplatesIcon color="error" />}
          to="/report-templates"
          text={t('REPORT_TEMPLATES')}
        />
      </ExpandeableNavElement>
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
            icon={<SeasonIcon color="error" />}
            to="/seasons"
            text={t('SEASONS')}
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
          <NavElement
            icon={<CompetitionIcon color="error" />}
            to="/competition-junior-levels"
            text={t('COMPETITION_JUNIOR_LEVELS')}
          />
          <NavElement
            icon={<CompetitionIcon color="error" />}
            to="/competition-types"
            text={t('COMPETITION_TYPES')}
          />
          <NavElement
            icon={<CompetitionIcon color="error" />}
            to="/competition-participations"
            text={t('COMPETITION_PARTICIPATIONS')}
          />
          <NavElement
            icon={<CompetitionIcon color="error" />}
            to="/competition-groups"
            text={t('COMPETITION_GROUPS')}
          />
          <NavElement
            icon={<PlayerPositionIcon color="error" />}
            to="/player-positions"
            text={t('POSITIONS')}
          />
          <NavElement
            icon={<BallIcon color="error" />}
            to="/user-football-roles"
            text={t('FOOTBALL_ROLES')}
          />
          <NavElement
            icon={<ReportBackgroundImagesIcon color="error" />}
            to="/report-background-images"
            text={t('REPORT_BACKGROUND_IMAGES')}
          />
          <NavElement
            icon={<UsersIcon color="error" />}
            to="/users"
            text={t('USERS')}
          />
          <NavElement
            icon={<UserSubscriptionsIcon color="error" />}
            to="/user-subscriptions"
            text={t('USER_SUBSCRIPTIONS')}
          />
          <NavElement
            icon={<OrganizationsIcon color="error" />}
            to="/organizations"
            text={t('ORGANIZATIONS')}
          />
          <NavElement
            icon={<TeamAffiliationIcon color="error" />}
            to="/team-affiliations"
            text={t('TEAM_AFFILIATIONS')}
          />
          <NavElement
            icon={<OrganizationSubscriptionsIcon color="error" />}
            to="/organization-subscriptions"
            text={t('ORGANIZATION_SUBSCRIPTIONS')}
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

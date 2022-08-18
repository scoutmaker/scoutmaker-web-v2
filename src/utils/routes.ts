export enum Routes {
  PLAYERS = 'players',
  TEAMS = 'teams',
  MATCHES = 'matches',
  REPORT_SKILL_ASSESSMENT_CATEGORIES = 'report-skill-assessment-categories',
}

export function getCreateRoute(route: Routes) {
  return `/${route}/create`
}

export function getEditRoute(route: Routes, identifier: string | number) {
  return `/${route}/edit/${identifier}`
}

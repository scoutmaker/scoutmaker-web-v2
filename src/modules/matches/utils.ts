import { Routes } from '@/utils/routes'

interface IGetMatchDisplayNameArgs {
  homeTeamName: string
  awayTeamName: string
  competitionName?: string
}

export function getMatchDisplayName({
  homeTeamName,
  awayTeamName,
  competitionName,
}: IGetMatchDisplayNameArgs) {
  return `${homeTeamName} vs. ${awayTeamName}${
    competitionName ? ` (${competitionName})` : ''
  }`
}

export function getMatchResult(homeGoals?: number, awayGoals?: number) {
  if (!homeGoals || !awayGoals) {
    return ''
  }

  return `${homeGoals}:${awayGoals}`
}

export function getSingleMatchRoute(id: string) {
  return `${Routes.MATCHES}/${id}`
}

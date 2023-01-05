import { Routes } from '@/utils/routes'

import { IMatchComboOptions, MatchBasicDataDto } from './types'

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

export const getBasicMatchName = (match: MatchBasicDataDto) =>
  `${match.homeTeam.name} vs ${match.awayTeam.name}`

export function getMatchResult(homeGoals?: number, awayGoals?: number) {
  if (!homeGoals || !awayGoals) {
    return ''
  }

  return `${homeGoals}:${awayGoals}`
}

export function getSingleMatchRoute(id: string) {
  return `${Routes.MATCHES}/${id}`
}

export function mapMatchesListToComboOptions(
  data: MatchBasicDataDto[],
): IMatchComboOptions[] {
  return data.map(({ id, homeTeam, awayTeam, competition, date }) => ({
    id,
    label: getMatchDisplayName({
      homeTeamName: homeTeam.name,
      awayTeamName: awayTeam.name,
      competitionName: competition.name,
    }),
    awayTeam,
    competition,
    date,
    homeTeam,
  }))
}

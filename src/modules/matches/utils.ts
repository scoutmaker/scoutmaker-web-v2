import { formatDate } from '@/utils/format-date'
import { Routes } from '@/utils/routes'

import { IMatchComboOptions, MatchBasicDataDto } from './types'

interface IGetMatchDisplayNameArgs {
  homeTeamName: string
  awayTeamName: string
  competitionName?: string
  date: string
}

export function getMatchDisplayName({
  homeTeamName,
  awayTeamName,
  competitionName,
  date,
}: IGetMatchDisplayNameArgs) {
  return `${homeTeamName} vs. ${awayTeamName}${
    competitionName ? ` (${competitionName})` : ''
  } ${formatDate(date)}`
}

export const getBasicMatchName = (
  match: Pick<MatchBasicDataDto, 'homeTeam' | 'awayTeam'>,
) => `${match.homeTeam.name} vs ${match.awayTeam.name}`

export function getMatchResult(homeGoals?: number, awayGoals?: number) {
  if (typeof homeGoals !== 'number' || typeof awayGoals !== 'number') {
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
      date,
    }),
    awayTeam,
    competition,
    date,
    homeTeam,
  }))
}

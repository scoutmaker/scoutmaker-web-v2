import { IComboOptions } from '@/components/combo/types'
import { Routes } from '@/utils/routes'

import { MatchBasicDataDto } from './types'

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

export function mapMatchesListToComboOptions(
  data: MatchBasicDataDto[],
): IComboOptions[] {
  return data.map(({ id, homeTeam, awayTeam, competition }) => ({
    id,
    label: getMatchDisplayName({
      homeTeamName: homeTeam.name,
      awayTeamName: awayTeam.name,
      competitionName: competition.name,
    }),
  }))
}

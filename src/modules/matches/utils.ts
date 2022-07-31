import { TeamBasicDataDto } from '../teams/types'

export function getDisplayName(
  homeTeam: TeamBasicDataDto,
  awayTeam: TeamBasicDataDto,
) {
  return `${homeTeam.name} vs. ${awayTeam.name}`
}

export function getResult(homeGoals?: number, awayGoals?: number) {
  if (!homeGoals || !awayGoals) {
    return ''
  }

  return `${homeGoals}:${awayGoals}`
}

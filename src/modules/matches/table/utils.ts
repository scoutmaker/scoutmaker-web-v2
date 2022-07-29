export function getMatchResult(homeGoals?: number, awayGoals?: number) {
  if (!homeGoals || !awayGoals) {
    return ''
  }

  return `${homeGoals}:${awayGoals}`
}

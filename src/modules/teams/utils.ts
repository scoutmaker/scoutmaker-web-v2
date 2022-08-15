import { Routes } from '@/utils/routes'

export function getSingleTeamRoute(slug: string) {
  return `${Routes.TEAMS}/${slug}`
}

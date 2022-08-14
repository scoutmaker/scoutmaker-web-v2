import { Routes } from '@/utils/routes'

export function getPlayerFullName<
  T extends { firstName: string; lastName: string },
>(player: T) {
  return `${player.firstName} ${player.lastName}`
}

export function getSinglePlayerRoute(slug: string) {
  return `${Routes.PLAYERS}/${slug}`
}

import { Routes } from '@/utils/routes'

import { UserDto } from '../users/types'
import { IPlayerComboOptions, PlayerBasicDataDto } from './types'

export function getPlayerFullName<
  T extends { firstName: string; lastName: string },
>(player: T) {
  return `${player.firstName} ${player.lastName}`
}

export function getSinglePlayerRoute(slug: string) {
  return `${Routes.PLAYERS}/${slug}`
}

export function mapPlayersListToComboOptions(
  data: PlayerBasicDataDto[],
): IPlayerComboOptions[] {
  return data.map(({ id, firstName, lastName, primaryPosition, teams }) => ({
    id,
    label: `${firstName} ${lastName}, ${primaryPosition.name} ${
      teams.length ? `(${teams[0]?.team.name})` : ''
    }`,
    firstName,
    lastName,
  }))
}

export const shouldShowPlayerRole = (user: UserDto | undefined): boolean =>
  !(!user?.organizationId && user?.role === 'SCOUT')

export const shouldShowPlayerRoleField = (user: UserDto | undefined): boolean =>
  user?.role === 'ADMIN' || user?.role === 'PLAYMAKER_SCOUT_MANAGER'

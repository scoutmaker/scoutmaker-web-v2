import { IComboOptions } from '@/components/combo/types'
import { Routes } from '@/utils/routes'

import { PlayerBasicDataDto } from './types'

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
): IComboOptions[] {
  return data.map(({ id, firstName, lastName, primaryPosition, teams }) => ({
    id,
    label: `${firstName} ${lastName}, ${primaryPosition.name} ${
      teams.length ? `(${teams[0]?.team.name})` : ''
    }`,
  }))
}

import { IComboOptions } from '@/components/combo/types'
import { getMatchDisplayName } from '@/modules/matches/utils'
import { getPlayerFullName } from '@/modules/players/utils'
import { getDocumentNumber } from '@/utils/get-document-number'

import { OrderBasicDataDto } from './types'

interface IGetOrderDisplayName {
  docNumber: number
  createdAt: string
  player?: OrderBasicDataDto['player']
  match?: OrderBasicDataDto['match']
}

export function getOrderDisplayName({
  docNumber,
  createdAt,
  player,
  match,
}: IGetOrderDisplayName) {
  const displayName = getDocumentNumber({ docNumber, createdAt })

  if (player) {
    return displayName.concat(
      ` (${getPlayerFullName({
        firstName: player.firstName,
        lastName: player.lastName,
      })})`,
    )
  }

  if (match) {
    return displayName.concat(
      ` (${getMatchDisplayName({
        homeTeamName: match.homeTeam.name,
        awayTeamName: match.awayTeam.name,
        date: match.date,
      })})`,
    )
  }

  return displayName
}

export function mapOrdersListToComboOptions(
  data: OrderBasicDataDto[],
): IComboOptions[] {
  return data.map(({ id, createdAt, docNumber, match, player }) => ({
    id,
    label: getOrderDisplayName({
      docNumber,
      createdAt,
      match,
      player,
    }),
  }))
}

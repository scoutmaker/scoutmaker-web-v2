import { IPlayerPositionComboOptions, PlayerPositionDto } from './types'

export function mapPlayerPositionsToComboOptions(
  data: PlayerPositionDto[],
): IPlayerPositionComboOptions[] {
  return data.map(({ id, name, code }) => ({
    id,
    label: name,
    name,
    code,
  }))
}

export function getPositionDisplayName(position: PlayerPositionDto) {
  const { name, positionType } = position

  return `${name}${positionType ? ` (${positionType.name})` : ''}`
}

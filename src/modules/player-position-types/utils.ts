import { IPlayerPositionTypeComboOptions, PlayerPositionTypeDto } from './types'

export function mapPlayerPositionTypesToComboOptions(
  data: PlayerPositionTypeDto[],
): IPlayerPositionTypeComboOptions[] {
  return data.map(({ id, name, code }) => ({
    id,
    label: name,
    name,
    code,
  }))
}

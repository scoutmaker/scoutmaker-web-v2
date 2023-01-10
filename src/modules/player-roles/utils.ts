import { IPlayerRolesComboOptions, PlayerRoleDto } from './types'

export function mapPlayerRolesToComboOptions(
  data: PlayerRoleDto[],
): IPlayerRolesComboOptions[] {
  return data.map(({ id, name, altName }) => ({
    id,
    label: name,
    name,
    altName,
  }))
}

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

export const groupPlayerRoleExamples = (
  examples: PlayerRoleDto['examples'],
): Record<string, string[]> => {
  const groupedExamples: Record<string, string[]> = {}
  examples.forEach(example => {
    if (!groupedExamples[example.type])
      groupedExamples[example.type] = [example.player]
    else groupedExamples[example.type].push(example.player)
  })
  return groupedExamples
}

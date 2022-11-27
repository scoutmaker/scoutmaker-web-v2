import { ISeasonComboOptions, SeasonDto } from './types'

export function mapSeasonsListToComboOptions(
  data: SeasonDto[],
): ISeasonComboOptions[] {
  return data.map(({ id, name, endDate, isActive, startDate }) => ({
    id,
    label: name,
    name,
    endDate,
    isActive,
    startDate,
  }))
}

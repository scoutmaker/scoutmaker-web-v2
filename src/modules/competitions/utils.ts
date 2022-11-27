import { CompetitionBasicDataDto, ICompetitionComboOptions } from './types'

export function mapCompetitionsListToComboOptions(
  data: CompetitionBasicDataDto[],
): ICompetitionComboOptions[] {
  return data.map(({ id, name, country, level }) => ({
    id,
    label: `${name} (${country.code})`,
    name,
    country,
    level,
  }))
}

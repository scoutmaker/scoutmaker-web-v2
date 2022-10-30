import {
  CompetitionGroupBasicDataDto,
  ICompetitionGroupComboOptions,
} from './types'

export function mapCompetitionGroupsListToComboOptions(
  data: CompetitionGroupBasicDataDto[],
): ICompetitionGroupComboOptions[] {
  return data.map(({ id, name, competition }) => ({
    id,
    label: `${competition.name}, ${name} (${competition.country.code})`,
    name,
    competition,
  }))
}

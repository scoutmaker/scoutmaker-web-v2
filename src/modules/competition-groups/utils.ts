import { IComboOptions } from '@/components/combo/types'

import { CompetitionGroupBasicDataDto } from './types'

export function mapCompetitionGroupsListToComboOptions(
  data: CompetitionGroupBasicDataDto[],
): IComboOptions[] {
  return data.map(({ id, name, competition }) => ({
    id,
    label: `${competition.name}, ${name} (${competition.country.code})`,
  }))
}

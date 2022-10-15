import { IComboOptions } from '@/components/combo/types'

import { CompetitionBasicDataDto } from './types'

export function mapCompetitionsListToComboOptions(
  data: CompetitionBasicDataDto[],
): IComboOptions[] {
  return data.map(({ id, name, country }) => ({
    id,
    label: `${name} (${country.code})`,
  }))
}

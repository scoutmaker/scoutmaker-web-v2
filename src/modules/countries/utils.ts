import { IComboOptions } from '@/components/combo/types'

import { CountryDto } from './types'

export function mapCountriesListToComboOptions(
  data: CountryDto[],
): IComboOptions[] {
  return data.map(({ id, name }) => ({
    id,
    label: name,
  }))
}

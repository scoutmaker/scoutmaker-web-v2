import { CountryDto, ICountryComboOptions } from './types'

export function mapCountriesListToComboOptions(
  data: CountryDto[],
): ICountryComboOptions[] {
  return data.map(({ id, name, code, isEuMember }) => ({
    id,
    label: name,
    name,
    code,
    isEuMember,
  }))
}

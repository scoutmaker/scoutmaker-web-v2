import { IComboOptions } from '@/components/combo/types'

export type CountryDto = Components.Schemas.CountryDto

export type CountriesFiltersDto = Pick<
  Paths.CountriesControllerFindAll.QueryParameters,
  'isEuMember'
>

export type CreateCountryDto = Components.Schemas.CreateCountryDto
export type UpdateCountryDto = Components.Schemas.UpdateCountryDto

export type CountriesSortBy = Paths.CountriesControllerFindAll.Parameters.SortBy

export type FindAllCountriesParams = Pick<
  Paths.CountriesControllerFindAll.QueryParameters,
  'isEuMember' | 'limit' | 'page' | 'sortBy' | 'sortingOrder'
>

export interface ICountryComboOptions extends IComboOptions {
  isEuMember: boolean
  code: string
  name: string
}

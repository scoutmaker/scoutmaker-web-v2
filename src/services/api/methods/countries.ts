import { CountryDto, FindAllCountriesParams } from '@/modules/countries/types'
import { TModuleName } from '@/services/api/modules'

import { getDataList, getPaginatedData } from './helpers'

const moduleName: TModuleName = 'countries'

export const getCountriesList = () => getDataList<CountryDto>(moduleName)

export const getCountries = (params: FindAllCountriesParams) =>
  getPaginatedData<FindAllCountriesParams, CountryDto>(params, moduleName)

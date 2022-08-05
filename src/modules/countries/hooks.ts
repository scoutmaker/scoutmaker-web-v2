import { CountryDto, FindAllCountriesParams } from '@/modules/countries/types'
import {
  getCountries,
  getCountriesList,
} from '@/services/api/methods/countries'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'

const moduleName: TModuleName = 'countries'

export const useCountriesList = () =>
  useList<CountryDto>(moduleName, getCountriesList)

export const useCountries = (params: FindAllCountriesParams) =>
  usePaginatedData<FindAllCountriesParams, CountryDto>(
    moduleName,
    params,
    getCountries,
  )

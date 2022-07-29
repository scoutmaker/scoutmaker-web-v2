import { CountryDto } from '@/modules/countries/types'
import { getCountriesList } from '@/services/api/methods/countries'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'countries'

export const useCountriesList = () =>
  useList<CountryDto>(moduleName, getCountriesList)

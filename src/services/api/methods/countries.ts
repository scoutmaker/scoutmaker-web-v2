import { CountryDto } from '@/modules/countries/types'
import { TModuleName } from '@/services/api/modules'

import { getDataList } from './helpers'

const moduleName: TModuleName = 'countries'

export const getCountriesList = () => getDataList<CountryDto>(moduleName)

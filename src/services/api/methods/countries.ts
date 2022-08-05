import {
  CountryDto,
  CreateCountryDto,
  FindAllCountriesParams,
  UpdateCountryDto,
} from '@/modules/countries/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'countries'

export const getCountriesList = () => getDataList<CountryDto>(moduleName)

export const getCountries = (params: FindAllCountriesParams) =>
  getPaginatedData<FindAllCountriesParams, CountryDto>(params, moduleName)

export const createCountry = (data: CreateCountryDto) =>
  createDocument<CreateCountryDto, CountryDto>(data, moduleName)

interface IUpdateCountryArgs {
  id: number
  data: UpdateCountryDto
}
export const updateCountry = ({ id, data }: IUpdateCountryArgs) =>
  updateDocument<UpdateCountryDto, CountryDto>(id, data, moduleName)

export const getCountryById = (id: number, token?: string) =>
  getAssetById<CountryDto>({ moduleName, id, token })

export const deleteCountry = (id: number) =>
  deleteDocument<CountryDto>(id, moduleName)

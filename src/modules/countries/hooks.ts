import {
  CountryDto,
  CreateCountryDto,
  FindAllCountriesParams,
  UpdateCountryDto,
} from '@/modules/countries/types'
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountriesList,
  updateCountry,
} from '@/services/api/methods/countries'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'countries'

export const useCountriesList = () =>
  useList<CountryDto>(moduleName, getCountriesList)

export const useCountries = (params: FindAllCountriesParams) =>
  usePaginatedData<FindAllCountriesParams, CountryDto>(
    moduleName,
    params,
    getCountries,
  )

export const useCreateCountry = () =>
  useCreateDocument<CreateCountryDto, CountryDto>(moduleName, createCountry)

export const useUpdateCountry = (id: string) =>
  useUpdateDocument<UpdateCountryDto, CountryDto>(moduleName, id, updateCountry)

export const useDeleteCountry = () =>
  useDeleteDocument<CountryDto>(moduleName, deleteCountry)

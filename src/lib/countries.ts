import { useQuery } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '../types/common'
import { CountryDto } from '../types/countries'
import { api } from './api'

// Get countries list
async function getCountriesList(): Promise<CountryDto[]> {
  const { data } = await api.get<ApiResponse<CountryDto[]>>('/countries/list')
  return data.data
}

export function useCountriesList() {
  const { setAlert } = useAlertsState()

  return useQuery(['countries', 'list'], getCountriesList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

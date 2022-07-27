import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { client } from '@/services/api/api'
import { ApiError, ApiResponse } from '@/types/common'
import { CountryDto } from '@/types/countries'

// Get countries list
async function getCountriesList(): Promise<CountryDto[]> {
  const { data } = await client.get<ApiResponse<CountryDto[]>>(
    '/countries/list',
  )
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

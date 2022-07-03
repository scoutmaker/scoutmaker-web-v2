import { useQuery } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '../types/common'
import { RegionDto } from '../types/regions'
import { api } from './api'

// Get regions list
async function getRegionsList(): Promise<RegionDto[]> {
  const { data } = await api.get<ApiResponse<RegionDto[]>>('/regions')
  return data.data
}

export function useRegionsList() {
  const { setAlert } = useAlertsState()

  return useQuery(['regions', 'list'], getRegionsList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

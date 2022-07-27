import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { client } from '@/services/api/api'
import { ApiError, ApiResponse } from '@/types/common'
import { RegionDto } from '@/types/regions'

// Get regions list
async function getRegionsList(): Promise<RegionDto[]> {
  const { data } = await client.get<ApiResponse<RegionDto[]>>('/regions/list')
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

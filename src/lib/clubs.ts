import { useQuery } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { ClubBasicDataDto } from '../types/clubs'
import { ApiError, ApiResponse } from '../types/common'
import { api } from './api'

// Get clubs list
async function getClubsList(): Promise<ClubBasicDataDto[]> {
  const { data } = await api.get<ApiResponse<ClubBasicDataDto[]>>('/clubs/list')
  return data.data
}

export function useClubsList() {
  const { setAlert } = useAlertsState()

  return useQuery(['clubs', 'list'], getClubsList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

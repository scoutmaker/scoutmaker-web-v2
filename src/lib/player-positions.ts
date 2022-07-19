import { useQuery } from 'react-query'

import { PlayerPositionDto } from '@/types/player-positions'

import { useAlertsState } from '../context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '../types/common'
import { api } from './api'

// Get player positions list
async function getPlayerPositionsList(): Promise<PlayerPositionDto[]> {
  const { data } = await api.get<ApiResponse<PlayerPositionDto[]>>(
    '/player-positions/list',
  )
  return data.data
}

export function usePlayerPositionsList() {
  const { setAlert } = useAlertsState()

  return useQuery(['player-positions', 'list'], getPlayerPositionsList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

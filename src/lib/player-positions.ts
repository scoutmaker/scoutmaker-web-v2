import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { client } from '@/services/api/api'
import { ApiError, ApiResponse } from '@/types/common'
import { PlayerPositionDto } from '@/types/player-positions'

// Get player positions list
async function getPlayerPositionsList(): Promise<PlayerPositionDto[]> {
  const { data } = await client.get<ApiResponse<PlayerPositionDto[]>>(
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

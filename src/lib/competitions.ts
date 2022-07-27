import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { client } from '@/services/api/api'
import { ApiError, ApiResponse } from '@/types/common'
import { CompetitionBasicDataDto } from '@/types/competitions'

// Get competitions list
async function getCompetitionsList(): Promise<CompetitionBasicDataDto[]> {
  const { data } = await client.get<ApiResponse<CompetitionBasicDataDto[]>>(
    '/competitions/list',
  )
  return data.data
}

export function useCompetitionsList() {
  const { setAlert } = useAlertsState()

  return useQuery(['competitions', 'list'], getCompetitionsList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

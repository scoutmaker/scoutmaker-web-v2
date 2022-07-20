import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '@/types/common'
import { CompetitionBasicDataDto } from '@/types/competitions'

import { api } from './api'

// Get competitions list
async function getCompetitionsList(): Promise<CompetitionBasicDataDto[]> {
  const { data } = await api.get<ApiResponse<CompetitionBasicDataDto[]>>(
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

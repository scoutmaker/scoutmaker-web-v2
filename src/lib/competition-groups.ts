import { CompetitionGroupBasicDataDto } from '@/types/competition-groups'
import { useQuery } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '../types/common'
import { api } from './api'

// Get competition groups list
async function getCompetitionGroupsList(): Promise<
  CompetitionGroupBasicDataDto[]
> {
  const { data } = await api.get<ApiResponse<CompetitionGroupBasicDataDto[]>>(
    '/competition-groups/list',
  )
  return data.data
}

export function useCompetitionGroupsList() {
  const { setAlert } = useAlertsState()

  return useQuery(['competition-groups', 'list'], getCompetitionGroupsList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

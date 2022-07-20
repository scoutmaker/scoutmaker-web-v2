import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '@/types/common'
import { UserFootballRoleDto } from '@/types/user-football-roles'

import { api } from './api'

// Get user football roles list
async function getUserFootballRolesList(): Promise<UserFootballRoleDto[]> {
  const { data } = await api.get<ApiResponse<UserFootballRoleDto[]>>(
    '/user-football-roles',
  )
  return data.data
}

export function useUserFootballRolesList() {
  const { setAlert } = useAlertsState()

  return useQuery(['user-football-roles', 'list'], getUserFootballRolesList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import {
  addMatchAttendance,
  getActiveMatchAttendance,
  removeMatchAttendance,
} from '@/services/api/methods/match-attendances'
import { TModuleName } from '@/services/api/modules'
import { ApiError, ApiResponse } from '@/services/api/types'

import { MatchAttendanceDto } from './types'

const moduleName: TModuleName = 'match-attendances'

export const useAddMatchAttendance = () =>
  useChangeAttendance(addMatchAttendance)

export const useRemoveMatchAttendance = () =>
  useChangeAttendance(removeMatchAttendance)

function useChangeAttendance(
  mutationFn: (matchId: string) => Promise<ApiResponse<MatchAttendanceDto>>,
) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((matchId: string) => mutationFn(matchId), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries([moduleName])
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

export const useActiveMatchAttendance = () => {
  const { setAlert } = useAlertsState()

  return useQuery(['match-attendances'], getActiveMatchAttendance, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

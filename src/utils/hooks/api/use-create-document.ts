import { useMutation, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '@/services/api/types'

export function useCreateDocument<CreateDto, ReturnType>(
  key: string,
  mutationFn: (data: CreateDto) => Promise<ApiResponse<ReturnType>>,
) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((values: CreateDto) => mutationFn(values), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries(key)
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

import { useMutation, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '@/services/api/types'

export function useToggleActiveDocument<DataType>(
  key: string,
  mutationFn: (id: number) => Promise<ApiResponse<DataType>>,
) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: number) => mutationFn(id), {
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

import { useMutation, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError, ApiResponse } from '@/services/api/types'

export function useUpdateDocument<UpdateDto, ReturnType>(
  key: string,
  docId: string,
  mutationFn: ({
    id,
    data,
  }: {
    id: string
    data: UpdateDto
  }) => Promise<ApiResponse<ReturnType>>,
) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: UpdateDto) => mutationFn({ id: docId, data: values }),
    {
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
    },
  )
}

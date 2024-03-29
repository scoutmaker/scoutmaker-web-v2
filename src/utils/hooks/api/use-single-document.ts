import { useQuery } from '@tanstack/react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError } from '@/services/api/types'

export function useSingleDocument<DataType>(
  key: string,
  id: string,
  queryFn: (id: string) => Promise<DataType>,
) {
  const { setAlert } = useAlertsState()

  return useQuery([key, id], () => queryFn(id), {
    enabled: id !== '',
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

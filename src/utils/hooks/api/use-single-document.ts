import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError } from '@/services/api/types'

export function useSingleDocument<DataType>(
  key: string,
  id: number,
  queryFn: (id: number) => Promise<DataType>,
) {
  const { setAlert } = useAlertsState()

  return useQuery([key, id], () => queryFn(id), {
    enabled: id !== 0,
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError } from '@/types/common'

export function useList<DataType>(
  key: string,
  queryFn: () => Promise<DataType[]>,
) {
  const { setAlert } = useAlertsState()

  return useQuery([key, 'list'], queryFn, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

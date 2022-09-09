import { useQuery } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError } from '@/services/api/types'
import { TValue } from '@/utils/map-object-to-query-params'

export function useList<
  DataType,
  ParamsType extends Record<string, TValue> = {},
>(
  key: string,
  queryFn: (params?: ParamsType) => Promise<DataType[]>,
  params?: ParamsType,
) {
  const { setAlert } = useAlertsState()

  return useQuery([key, 'list'], () => queryFn(params), {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

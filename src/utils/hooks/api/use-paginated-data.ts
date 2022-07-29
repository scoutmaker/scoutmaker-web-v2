import { useQuery, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError, TPaginatedData } from '@/services/api/types'
import { TValue } from '@/utils/map-object-to-query-params'

export function usePaginatedData<
  ParamsType extends Record<string, TValue>,
  DataType,
>(
  key: string,
  params: ParamsType,
  queryFn: (params: ParamsType) => Promise<TPaginatedData<DataType>>,
) {
  const { setAlert } = useAlertsState()
  const queryClient = useQueryClient()

  return useQuery([key, { ...params }], () => queryFn(params), {
    keepPreviousData: true,
    onSuccess: data => {
      queryClient.setQueryData('players', data.docs)
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

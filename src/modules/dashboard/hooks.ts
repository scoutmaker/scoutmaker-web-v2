import { useQuery } from '@tanstack/react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { getDashboardData } from '@/services/api/methods/dashboard'
import { ApiError } from '@/services/api/types'

export const useDashboardData = () => {
  const { setAlert } = useAlertsState()

  return useQuery(['dashboard'], getDashboardData, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

import { useQuery } from '@tanstack/react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { getLandingPageNumbers } from '@/services/api/methods/landing-home'
import { ApiError } from '@/services/api/types'

export function useLandingPageNumbers(enabled: boolean = true) {
  const { setAlert } = useAlertsState()

  return useQuery(['landing-page-numbers'], getLandingPageNumbers, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
    enabled,
  })
}

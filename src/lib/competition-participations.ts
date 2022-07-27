import { useQuery, useQueryClient } from 'react-query'
import { client } from 'services/api/api'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiError, ApiResponse, TPaginatedData } from '@/types/common'
import {
  CompetitionParticipationDto,
  FindAllCompetitionParticipationsParams,
} from '@/types/competition-participations'

// Get paginated competition participations
type TPaginatedCompetitionParticipations =
  TPaginatedData<CompetitionParticipationDto>
type TGetCompetitionParticipationsResponse =
  ApiResponse<TPaginatedCompetitionParticipations>

async function getCompetitionParticipations(
  params: FindAllCompetitionParticipationsParams,
) {
  const query = Object.entries(params)
    .map(([key, value]) => {
      if (!value) {
        return null
      }
      return `${key}=${value}`
    })
    .filter(item => item)
    .join('&')

  const { data } = await client.get<TGetCompetitionParticipationsResponse>(
    `/competition-participations?${query}`,
  )
  return data.data
}

export function useCompetitionParticipations(
  params: FindAllCompetitionParticipationsParams,
) {
  const { setAlert } = useAlertsState()
  const queryClient = useQueryClient()

  return useQuery(
    ['competition-participations', { ...params }],
    () => getCompetitionParticipations(params),
    {
      keepPreviousData: true,
      onSuccess: data => {
        queryClient.setQueryData('competition-participations', data.docs)
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}

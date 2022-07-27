import { useQuery, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { client } from '@/services/api/api'
import { ApiError, ApiResponse, TPaginatedData } from '@/types/common'
import {
  FindAllTeamAffiliationsParams,
  TeamAffiliationDto,
} from '@/types/team-affiliations'

import { mapObjectToQueryParams } from './helpers'

// Get paginated team affiliations
type TPaginatedTeamAffiliations = TPaginatedData<TeamAffiliationDto>

type TGetTeamAffiliationsResponse = ApiResponse<TPaginatedTeamAffiliations>

async function getTeamAffiliations(params: FindAllTeamAffiliationsParams) {
  const query = mapObjectToQueryParams({ ...params })

  const { data } = await client.get<TGetTeamAffiliationsResponse>(
    `/team-affiliations?${query}`,
  )
  return data.data
}

export function useTeamAffiliations(params: FindAllTeamAffiliationsParams) {
  const { setAlert } = useAlertsState()
  const queryClient = useQueryClient()

  return useQuery(
    ['team-affiliations', { ...params }],
    () => getTeamAffiliations(params),
    {
      keepPreviousData: true,
      onSuccess: data => {
        queryClient.setQueryData('team-affiliations', data.docs)
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}

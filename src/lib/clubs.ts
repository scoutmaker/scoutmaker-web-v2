import { useQuery, useQueryClient } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { ClubBasicDataDto, ClubDto, FindAllClubsParams } from '../types/clubs'
import { ApiError, ApiResponse, TPaginatedData } from '../types/common'
import { api } from './api'

// Get clubs list
async function getClubsList(): Promise<ClubBasicDataDto[]> {
  const { data } = await api.get<ApiResponse<ClubBasicDataDto[]>>('/clubs/list')
  return data.data
}

export function useClubsList() {
  const { setAlert } = useAlertsState()

  return useQuery(['clubs', 'list'], getClubsList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Get paginated clubs
type TPaginatedClubs = TPaginatedData<ClubDto>
type TGetClubsResponse = ApiResponse<TPaginatedClubs>

async function getClubs(params: FindAllClubsParams) {
  const query = Object.entries(params)
    .map(([key, value]) => {
      if (!value) {
        return null
      }
      return `${key}=${value}`
    })
    .filter(item => item)
    .join('&')

  const { data } = await api.get<TGetClubsResponse>(`/clubs?${query}`)
  return data.data
}

export function useClubs(params: FindAllClubsParams) {
  const { setAlert } = useAlertsState()
  const queryClient = useQueryClient()

  return useQuery(['clubs', { ...params }], () => getClubs(params), {
    keepPreviousData: true,
    onSuccess: data => {
      queryClient.setQueryData('clubs', data.docs)
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

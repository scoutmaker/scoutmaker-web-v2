import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import {
  ClubBasicDataDto,
  ClubDto,
  CreateClubDto,
  FindAllClubsParams,
  UpdateClubDto,
} from '../types/clubs'
import { ApiError, ApiResponse, TPaginatedData } from '../types/common'
import { api } from './api'

// Get single club by slug
export async function getClubBySlug(slug: string, token?: string) {
  const config = token ? { headers: { 'x-auth-token': token } } : {}
  const { data } = await api.get<ApiResponse<ClubDto>>(
    `/clubs/by-slug/${slug}`,
    config,
  )

  return data.data
}

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

// Create new club
async function createClub(
  clubData: CreateClubDto,
): Promise<ApiResponse<ClubDto>> {
  const { data } = await api.post<ApiResponse<ClubDto>>('/clubs', clubData)
  return data
}

export function useCreateClub() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((values: CreateClubDto) => createClub(values), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('clubs')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Update club
interface IUpdateClubArgs {
  id: string
  clubData: UpdateClubDto
}

async function updateClub({
  id,
  clubData,
}: IUpdateClubArgs): Promise<ApiResponse<ClubDto>> {
  const { data } = await api.patch<ApiResponse<ClubDto>>(
    `/clubs/${id}`,
    clubData,
  )
  return data
}

export function useUpdateClub(id: string) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: UpdateClubDto) => updateClub({ id, clubData: values }),
    {
      onSuccess: data => {
        setAlert({
          msg: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries('clubs')
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.error,
          type: 'error',
        }),
    },
  )
}

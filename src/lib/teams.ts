import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { client } from '@/services/api/api'
import { ApiError, ApiResponse, TPaginatedData } from '@/types/common'
import {
  CreateTeamDto,
  FindAllTeamsParams,
  TeamBasicDataDto,
  TeamDto,
  UpdateTeamDto,
} from '@/types/teams'

// Get single team by slug
export async function getTeamBySlug(slug: string, token?: string) {
  const config = token ? { headers: { 'x-auth-token': token } } : {}
  const { data } = await client.get<ApiResponse<TeamDto>>(
    `/teams/by-slug/${slug}`,
    config,
  )

  return data.data
}

// Get teams list
async function getTeamsList(): Promise<TeamBasicDataDto[]> {
  const { data } = await client.get<ApiResponse<TeamBasicDataDto[]>>(
    '/teams/list',
  )
  return data.data
}

export function useTeamsList() {
  const { setAlert } = useAlertsState()

  return useQuery(['teams', 'list'], getTeamsList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Get paginated teams
type TPaginatedTeams = TPaginatedData<TeamDto>
type TGetTeamsResponse = ApiResponse<TPaginatedTeams>

async function getTeams(params: FindAllTeamsParams) {
  const query = Object.entries(params)
    .map(([key, value]) => {
      if (!value || value?.length === 0) {
        return null
      }

      if (typeof value === 'object') {
        return value?.map((val: string) => `${key}=${val}`).join('&')
      }

      return `${key}=${value}`
    })
    .filter(item => item)
    .join('&')

  const { data } = await client.get<TGetTeamsResponse>(`/teams?${query}`)
  return data.data
}

export function useTeams(params: FindAllTeamsParams) {
  const { setAlert } = useAlertsState()
  const queryClient = useQueryClient()

  return useQuery(['teams', { ...params }], () => getTeams(params), {
    keepPreviousData: true,
    onSuccess: data => {
      queryClient.setQueryData('teams', data.docs)
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Create new team
async function createTeam(
  teamData: CreateTeamDto,
): Promise<ApiResponse<TeamDto>> {
  const { data } = await client.post<ApiResponse<TeamDto>>('/teams', teamData)
  return data
}

export function useCreateTeam() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((values: CreateTeamDto) => createTeam(values), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('teams')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Update team
interface IUpdateTeamArgs {
  id: number
  teamData: UpdateTeamDto
}

async function updateTeam({
  id,
  teamData,
}: IUpdateTeamArgs): Promise<ApiResponse<TeamDto>> {
  const { data } = await client.patch<ApiResponse<TeamDto>>(
    `/teams/${id}`,
    teamData,
  )
  return data
}

export function useUpdateTeam(id: number) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: UpdateTeamDto) => updateTeam({ id, teamData: values }),
    {
      onSuccess: data => {
        setAlert({
          msg: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries('teams')
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}

// Delete team
async function deleteTeam(id: number): Promise<ApiResponse<TeamDto>> {
  const { data } = await client.delete<ApiResponse<TeamDto>>(`/teams/${id}`)
  return data
}

export function useDeleteTeam() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: number) => deleteTeam(id), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('teams')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Like team
async function likeTeam(id: number): Promise<ApiResponse<TeamDto>> {
  const { data } = await client.post<ApiResponse<TeamDto>>(`/like-teams/${id}`)
  return data
}

export function useLikeTeam() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: number) => likeTeam(id), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('teams')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Unlike team
async function unlikeTeam(id: number): Promise<ApiResponse<TeamDto>> {
  const { data } = await client.delete<ApiResponse<TeamDto>>(
    `/like-teams/${id}`,
  )
  return data
}

export function useUnlikeTeam() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: number) => unlikeTeam(id), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('teams')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

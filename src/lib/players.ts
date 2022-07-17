import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ApiResponse, TPaginatedData, ApiError } from '@/types/common'
import {
  CreatePlayerDto,
  FindAllPlayersParams,
  PlayerBasicDataDto,
  PlayerDto,
  UpdatePlayerDto,
} from '@/types/players'
import { api } from './api'

// Get single player by slug
export async function getPlayerBySlug(slug: string, token?: string) {
  const config = token ? { headers: { 'x-auth-token': token } } : {}
  const { data } = await api.get<ApiResponse<PlayerDto>>(
    `/players/by-slug/${slug}`,
    config,
  )

  return data.data
}

// Get players list
async function getPlayersList(): Promise<PlayerBasicDataDto[]> {
  const { data } = await api.get<ApiResponse<PlayerBasicDataDto[]>>(
    '/players/list',
  )
  return data.data
}

export function usePlayersList() {
  const { setAlert } = useAlertsState()

  return useQuery(['players', 'list'], getPlayersList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Get paginated players
type TPaginatedPlayers = TPaginatedData<PlayerDto>
type TGetPlayersResponse = ApiResponse<TPaginatedPlayers>

async function getPlayers(params: FindAllPlayersParams) {
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

  const { data } = await api.get<TGetPlayersResponse>(`/players?${query}`)
  return data.data
}

export function usePlayers(params: FindAllPlayersParams) {
  const { setAlert } = useAlertsState()
  const queryClient = useQueryClient()

  return useQuery(['players', { ...params }], () => getPlayers(params), {
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

// Create new player
async function createPlayer(
  playerData: CreatePlayerDto,
): Promise<ApiResponse<PlayerDto>> {
  const { data } = await api.post<ApiResponse<PlayerDto>>(
    '/players',
    playerData,
  )
  return data
}

export function useCreatePlayer() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((values: CreatePlayerDto) => createPlayer(values), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('players')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Update player
interface IUpdatePlayerArgs {
  id: string
  playerData: UpdatePlayerDto
}

async function updatePlayer({
  id,
  playerData,
}: IUpdatePlayerArgs): Promise<ApiResponse<PlayerDto>> {
  const { data } = await api.patch<ApiResponse<PlayerDto>>(
    `/players/${id}`,
    playerData,
  )
  return data
}

export function useUpdatePlayer(id: string) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: UpdatePlayerDto) => updatePlayer({ id, playerData: values }),
    {
      onSuccess: data => {
        setAlert({
          msg: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries('players')
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}

// Delete player
async function deletePlayer(id: string): Promise<ApiResponse<PlayerDto>> {
  const { data } = await api.delete<ApiResponse<PlayerDto>>(`/players/${id}`)
  return data
}

export function useDeletePlayer() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: string) => deletePlayer(id), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('players')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Like player
async function likePlayer(id: string): Promise<ApiResponse<PlayerDto>> {
  const { data } = await api.post<ApiResponse<PlayerDto>>(`/like-players/${id}`)
  return data
}

export function useLikePlayer() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: string) => likePlayer(id), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('players')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Unlike player
async function unlikePlayer(id: string): Promise<ApiResponse<PlayerDto>> {
  const { data } = await api.delete<ApiResponse<PlayerDto>>(
    `/like-players/${id}`,
  )
  return data
}

export function useUnlikePlayer() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: string) => unlikePlayer(id), {
    onSuccess: data => {
      setAlert({
        msg: data.message,
        type: 'success',
      })
      queryClient.invalidateQueries('players')
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

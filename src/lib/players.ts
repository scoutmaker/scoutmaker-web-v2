import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import {
  createDocument,
  deleteDocument,
  getAssetBySlug,
  getDataList,
  getPaginatedData,
  likeDocument,
  unlikeDocument,
  updateDocument,
} from '@/services/api/methods/helpers'
import { ApiError, ApiResponse, TPaginatedData } from '@/types/common'
import {
  CreatePlayerDto,
  FindAllPlayersParams,
  PlayerBasicDataDto,
  PlayerDto,
  UpdatePlayerDto,
} from '@/types/players'

// Get single player by slug
// export async function getPlayerBySlug(slug: string, token?: string) {
//   const config = token ? { headers: { 'x-auth-token': token } } : {}
//   const { data } = await client.get<ApiResponse<PlayerDto>>(
//     `/players/by-slug/${slug}`,
//     config,
//   )

//   return data.data
// }

export const getPlayerBySlug = (slug: string, token?: string) =>
  getAssetBySlug<PlayerDto>({ moduleName: 'players', slug, token })

// GET DATA LIST
// apiurl: string

// getPlayersList = getDataList('players') // service method

// service
// - api (axios creation, axios middlewares)
// -- methods (ready to use methods, that return the data)
// --- players
// ---- getPlayersList (returns list of players)
// -----(context) => try {getDataList(context)}catch(e){throw new Error(e)}
// ---- removePlayer (DELETE playerID)
// -- helpers
// --- getDataList = (context) => makes a API call based on context
// --- getDataList = (context) => await api.get<ApiResponse<T[]>>(`/${context}/list`)

// FIXME: to ja ponizej powyzej :shame:

// Get players list
// async function getList(context): Promise<PlayerBasicDataDto[]> {
//   const { data } = await api.get<ApiResponse<PlayerBasicDataDto[]>>(
//     `/${context}/list`,
//   )
//   return data.data
// }

// export function usePlayersList() {
//   return useList()('players')
// }

// function useList() {
//   const { setAlert } = useAlertsState()
//   const onError = (err: ApiError) =>
//     setAlert({
//       msg: err.response.data.message,
//       type: 'error',
//     })

//   return context =>
//     useQuery([context, 'list'], getList(context), {
//       onError,
//     })
// }

// FIXME: to ja dotknalem powyzej :shame:

// Get players list
// async function getPlayersList(): Promise<PlayerBasicDataDto[]> {
//   const { data } = await client.get<ApiResponse<PlayerBasicDataDto[]>>(
//     '/players/list',
//   )
//   return data.data
// }

export const getPlayersList = () => getDataList<PlayerBasicDataDto>('players')

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

// async function getPlayers(params: FindAllPlayersParams) {
//   const query = mapObjectToQueryParams(params)

//   const { data } = await client.get<TGetPlayersResponse>(`/players?${query}`)
//   return data.data
// }
export const getPlayers = (params: FindAllPlayersParams) =>
  getPaginatedData<FindAllPlayersParams, PlayerDto>(params, 'players')

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
// async function createPlayer(
//   playerData: CreatePlayerDto,
// ): Promise<ApiResponse<PlayerDto>> {
//   const { data } = await client.post<ApiResponse<PlayerDto>>(
//     '/players',
//     playerData,
//   )
//   return data
// }

const createPlayer = (data: CreatePlayerDto) =>
  createDocument<CreatePlayerDto, PlayerDto>(data, 'players')

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
  id: number
  data: UpdatePlayerDto
}

// async function updatePlayer({
//   id,
//   playerData,
// }: IUpdatePlayerArgs): Promise<ApiResponse<PlayerDto>> {
//   const { data } = await client.patch<ApiResponse<PlayerDto>>(
//     `/players/${id}`,
//     playerData,
//   )
//   return data
// }

const updatePlayer = ({ id, data }: IUpdatePlayerArgs) =>
  updateDocument<UpdatePlayerDto, PlayerDto>(id, data, 'players')

export function useUpdatePlayer(id: number) {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: UpdatePlayerDto) => updatePlayer({ id, data: values }),
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
// async function deletePlayer(id: number): Promise<ApiResponse<PlayerDto>> {
//   const { data } = await client.delete<ApiResponse<PlayerDto>>(`/players/${id}`)
//   return data
// }
const deletePlayer = (id: number) => deleteDocument<PlayerDto>(id, 'players')

export function useDeletePlayer() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: number) => deletePlayer(id), {
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
// async function likePlayer(id: number): Promise<ApiResponse<PlayerDto>> {
//   const { data } = await client.post<ApiResponse<PlayerDto>>(
//     `/like-players/${id}`,
//   )
//   return data
// }
const likePlayer = (id: number) => likeDocument<PlayerDto>(id, 'players')

export function useLikePlayer() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: number) => likePlayer(id), {
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
// async function unlikePlayer(id: number): Promise<ApiResponse<PlayerDto>> {
//   const { data } = await client.delete<ApiResponse<PlayerDto>>(
//     `/like-players/${id}`,
//   )
//   return data
// }
const unlikePlayer = (id: number) => unlikeDocument<PlayerDto>(id, 'players')

export function useUnlikePlayer() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((id: number) => unlikePlayer(id), {
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

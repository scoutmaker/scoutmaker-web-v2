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
import {
  CreatePlayerDto,
  FindAllPlayersParams,
  PlayerBasicDataDto,
  PlayerDto,
  UpdatePlayerDto,
} from '@/types/players'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useLikeDocument } from '@/utils/hooks/api/use-like-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUnlikeDocument } from '@/utils/hooks/api/use-unlike-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

export const getPlayerBySlug = (slug: string, token?: string) =>
  getAssetBySlug<PlayerDto>({ moduleName: 'players', slug, token })

export const getPlayersList = () => getDataList<PlayerBasicDataDto>('players')

export const usePlayersList = () =>
  useList<PlayerBasicDataDto>('players', getPlayersList)

export const getPlayers = (params: FindAllPlayersParams) =>
  getPaginatedData<FindAllPlayersParams, PlayerDto>(params, 'players')

export const usePlayers = (params: FindAllPlayersParams) =>
  usePaginatedData<FindAllPlayersParams, PlayerDto>(
    'players',
    params,
    getPlayers,
  )

const createPlayer = (data: CreatePlayerDto) =>
  createDocument<CreatePlayerDto, PlayerDto>(data, 'players')

export const useCreatePlayer = () => useCreateDocument('players', createPlayer)

// Update player
interface IUpdatePlayerArgs {
  id: number
  data: UpdatePlayerDto
}

const updatePlayer = ({ id, data }: IUpdatePlayerArgs) =>
  updateDocument<UpdatePlayerDto, PlayerDto>(id, data, 'players')

export const useUpdatePlayer = (id: number) =>
  useUpdateDocument<UpdatePlayerDto, PlayerDto>('players', id, updatePlayer)

const deletePlayer = (id: number) => deleteDocument<PlayerDto>(id, 'players')

export const useDeletePlayer = () =>
  useDeleteDocument<PlayerDto>('players', deletePlayer)

const likePlayer = (id: number) => likeDocument<PlayerDto>(id, 'players')

export const useLikePlayer = () =>
  useLikeDocument<PlayerDto>('players', likePlayer)

const unlikePlayer = (id: number) => unlikeDocument<PlayerDto>(id, 'players')

export const useUnlikePlayer = () =>
  useUnlikeDocument<PlayerDto>('players', unlikePlayer)

import {
  CreatePlayerDto,
  FindAllPlayersParams,
  PlayerBasicDataDto,
  PlayerDto,
  PlayersFiltersDto,
  UpdatePlayerDto,
} from '@/modules/players/types'
import {
  createPlayer,
  deletePlayer,
  getPlayers,
  getPlayersList,
  likePlayer,
  unlikePlayer,
  updatePlayer,
} from '@/services/api/methods/players'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useLikeDocument } from '@/utils/hooks/api/use-like-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUnlikeDocument } from '@/utils/hooks/api/use-unlike-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'players'

export const usePlayersList = (params?: PlayersFiltersDto) =>
  useList<PlayerBasicDataDto, PlayersFiltersDto>(
    moduleName,
    getPlayersList,
    params,
  )

export const usePlayers = (params: FindAllPlayersParams) =>
  usePaginatedData<FindAllPlayersParams, PlayerDto>(
    moduleName,
    params,
    getPlayers,
  )

export const useCreatePlayer = () =>
  useCreateDocument<CreatePlayerDto, PlayerDto>(moduleName, createPlayer)

export const useUpdatePlayer = (id: string) =>
  useUpdateDocument<UpdatePlayerDto, PlayerDto>(moduleName, id, updatePlayer)

export const useDeletePlayer = () =>
  useDeleteDocument<PlayerDto>(moduleName, deletePlayer)

export const useLikePlayer = () =>
  useLikeDocument<PlayerDto>(moduleName, likePlayer)

export const useUnlikePlayer = () =>
  useUnlikeDocument<PlayerDto>(moduleName, unlikePlayer)

import {
  CreatePlayerDto,
  FindAllPlayersParams,
  PlayerBasicDataDto,
  PlayerDto,
  PlayersFiltersDto,
  UpdatePlayerDto,
} from '@/modules/players/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getAssetBySlug,
  getDataList,
  getPaginatedData,
  likeDocument,
  unlikeDocument,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'players'

export const getPlayerBySlug = (slug: string, token?: string) =>
  getAssetBySlug<PlayerDto>({ moduleName, slug, token })

export const getPlayerById = (id: string, token?: string) =>
  getAssetById<PlayerDto>({ moduleName, id, token })

export const getPlayersList = (params?: PlayersFiltersDto) =>
  getDataList<PlayerBasicDataDto, PlayersFiltersDto>(moduleName, params)

export const getPlayers = (params: FindAllPlayersParams) =>
  getPaginatedData<FindAllPlayersParams, PlayerDto>(params, moduleName)

export const createPlayer = (data: CreatePlayerDto) =>
  createDocument<CreatePlayerDto, PlayerDto>(data, moduleName)

interface IUpdatePlayerArgs {
  id: string
  data: UpdatePlayerDto
}

export const updatePlayer = ({ id, data }: IUpdatePlayerArgs) =>
  updateDocument<UpdatePlayerDto, PlayerDto>(id, data, moduleName)

export const deletePlayer = (id: string) =>
  deleteDocument<PlayerDto>(id, moduleName)

export const likePlayer = (id: string) =>
  likeDocument<PlayerDto>(id, moduleName)

export const unlikePlayer = (id: string) =>
  unlikeDocument<PlayerDto>(id, moduleName)

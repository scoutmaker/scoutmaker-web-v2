import {
  CreatePlayerStatsDto,
  FindAllPlayerStatsParams,
  PlayerStatsDto,
  UpdatePlayerStatsDto,
} from '@/modules/player-stats/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'player-stats'

export const getPlayerStats = (params: FindAllPlayerStatsParams) =>
  getPaginatedData<FindAllPlayerStatsParams, PlayerStatsDto>(params, moduleName)

export const deletePlayerStats = (id: string) =>
  deleteDocument<PlayerStatsDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdatePlayerStatsDto
}
export const updatePlayerStats = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdatePlayerStatsDto, PlayerStatsDto>(id, data, moduleName)

export const createPlayerStats = (data: CreatePlayerStatsDto) =>
  createDocument<CreatePlayerStatsDto, PlayerStatsDto>(data, moduleName)

export const getPlayerStatsById = (id: string, token?: string) =>
  getAssetById<PlayerStatsDto>({ moduleName, id, token })

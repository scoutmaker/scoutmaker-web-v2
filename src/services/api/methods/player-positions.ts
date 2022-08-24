import {
  CreatePlayerPostitionDto,
  FindAllPlayerPositionsParams,
  PlayerPositionDto,
  UpdatePlayerPostitionDto,
} from '@/modules/player-positions/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'player-positions'

export const getPlayerPositionsList = () =>
  getDataList<PlayerPositionDto>(moduleName)

export const getPlayerPositions = (params: FindAllPlayerPositionsParams) =>
  getPaginatedData<FindAllPlayerPositionsParams, PlayerPositionDto>(
    params,
    moduleName,
  )

export const createPlayerPosition = (data: CreatePlayerPostitionDto) =>
  createDocument<CreatePlayerPostitionDto, PlayerPositionDto>(data, moduleName)

interface IUpdateArgs {
  id: number
  data: UpdatePlayerPostitionDto
}
export const updatePlayerPosition = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdatePlayerPostitionDto, PlayerPositionDto>(
    id,
    data,
    moduleName,
  )

export const getPlayerPositionById = (id: number, token?: string) =>
  getAssetById<PlayerPositionDto>({ moduleName, id, token })

export const deletePlayerPosition = (id: number) =>
  deleteDocument<PlayerPositionDto>(id, moduleName)

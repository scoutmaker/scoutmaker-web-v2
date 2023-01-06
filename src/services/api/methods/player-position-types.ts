import {
  CreatePlayerPostitionTypeDto,
  FindAllPlayerPositionsTypesParams,
  PlayerPositionTypeDto,
  UpdatePlayerPostitionTypeDto,
} from '@/modules/player-position-types/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'player-position-types'

export const getPlayerPositionTypesList = () =>
  getDataList<PlayerPositionTypeDto>(moduleName)

export const getPlayerPositionTypes = (
  params: FindAllPlayerPositionsTypesParams,
) =>
  getPaginatedData<FindAllPlayerPositionsTypesParams, PlayerPositionTypeDto>(
    params,
    moduleName,
  )

export const createPlayerPositionType = (data: CreatePlayerPostitionTypeDto) =>
  createDocument<CreatePlayerPostitionTypeDto, PlayerPositionTypeDto>(
    data,
    moduleName,
  )

interface IUpdateArgs {
  id: string
  data: UpdatePlayerPostitionTypeDto
}
export const updatePlayerPositionType = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdatePlayerPostitionTypeDto, PlayerPositionTypeDto>(
    id,
    data,
    moduleName,
  )

export const getPlayerPositionTypeById = (id: string, token?: string) =>
  getAssetById<PlayerPositionTypeDto>({ moduleName, id, token })

export const deletePlayerPositionType = (id: string) =>
  deleteDocument<PlayerPositionTypeDto>(id, moduleName)

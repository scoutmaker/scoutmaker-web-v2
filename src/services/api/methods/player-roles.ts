import {
  CreatePlayerRoleDto,
  FindAllPlayerRolesParams,
  PlayerRoleDto,
  UpdatePlayerRoleDto,
} from '@/modules/player-roles/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'player-roles'

export const getPlayerRolesList = () => getDataList<PlayerRoleDto>(moduleName)

export const getPlayerRoles = (params: FindAllPlayerRolesParams) =>
  getPaginatedData<FindAllPlayerRolesParams, PlayerRoleDto>(params, moduleName)

export const createPlayerRole = (data: CreatePlayerRoleDto) =>
  createDocument<CreatePlayerRoleDto, PlayerRoleDto>(data, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdatePlayerRoleDto
}
export const updatePlayerRole = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdatePlayerRoleDto, PlayerRoleDto>(id, data, moduleName)

export const getPlayerRoleById = (id: string, token?: string) =>
  getAssetById<PlayerRoleDto>({ moduleName, id, token })

export const deletePlayerRole = (id: string) =>
  deleteDocument<PlayerRoleDto>(id, moduleName)

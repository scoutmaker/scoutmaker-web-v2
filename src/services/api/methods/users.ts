import {
  FindAllUsersParams,
  UserBasicDataDto,
  UserDto,
} from '@/modules/users/types'
import {
  getAssetById,
  getDataList,
  getPaginatedData,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'
import { ApiResponse } from '../types'

const moduleName: TModuleName = 'users'

export const getUsersList = () => getDataList<UserBasicDataDto>(moduleName)

export const getUsers = (params: FindAllUsersParams) =>
  getPaginatedData<FindAllUsersParams, UserDto>(params, moduleName)

export const getUserById = (id: number, token?: string) =>
  getAssetById<UserDto>({ moduleName, id, token })

export const setScoutRoleUser = (id: number) => changeUserRole(id, 'SCOUT')

export const setPMScoutRoleUser = (id: number) =>
  changeUserRole(id, 'PLAYMAKER_SCOUT')

async function changeUserRole(
  id: number,
  role: 'SCOUT' | 'PLAYMAKER_SCOUT',
): Promise<ApiResponse<UserDto>> {
  const { data } = await client.patch<ApiResponse<UserDto>>(
    `/${moduleName}/${id}/change-role`,
    { role },
  )
  return data
}

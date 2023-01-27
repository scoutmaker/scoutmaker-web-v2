import {
  FindAllUsersParams,
  UserBasicDataDto,
  UserDto,
  UsersFiltersDto,
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

export const getUsersList = (params?: UsersFiltersDto) =>
  getDataList<UserBasicDataDto>(moduleName, params)

export const getUsers = (params: FindAllUsersParams) =>
  getPaginatedData<FindAllUsersParams, UserDto>(params, moduleName)

export const getUserById = (id: string, token?: string) =>
  getAssetById<UserDto>({ moduleName, id, token })

export async function setUserRole(
  id: string,
  role: UserDto['role'],
): Promise<ApiResponse<UserDto>> {
  const { data } = await client.patch<ApiResponse<UserDto>>(
    `/${moduleName}/${id}/change-role`,
    { role },
  )
  return data
}

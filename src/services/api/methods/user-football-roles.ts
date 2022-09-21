import {
  CreateUserFootballRoleDto,
  FindAllUserFootballRolesDto,
  UpdateUserFootballRoleDto,
  UserFootballRoleDto,
} from '@/modules/user-football-roles/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'user-football-roles'

export const getUserFootballRolesList = () =>
  getDataList<UserFootballRoleDto>(moduleName)

export const getUserFootballRoles = (params: FindAllUserFootballRolesDto) =>
  getPaginatedData<FindAllUserFootballRolesDto, UserFootballRoleDto>(
    params,
    moduleName,
  )

export const createUserFootballRole = (data: CreateUserFootballRoleDto) =>
  createDocument<CreateUserFootballRoleDto, UserFootballRoleDto>(
    data,
    moduleName,
  )

interface IUpdateArgs {
  id: string
  data: UpdateUserFootballRoleDto
}
export const updateUserFootballRole = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateUserFootballRoleDto, UserFootballRoleDto>(
    id,
    data,
    moduleName,
  )

export const deleteUserFootballRole = (id: string) =>
  deleteDocument<UserFootballRoleDto>(id, moduleName)

export const getUserFootballRoleById = (id: string, token?: string) =>
  getAssetById<UserFootballRoleDto>({ moduleName, id, token })

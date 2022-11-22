import {
  CreateUserPlayerAclDto,
  FindAllUserPlayerAclsParams,
  UpdateUserPlayerAclDto,
  UserPlayerAclDto,
} from '@/modules/user-player-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'user-player-acl'

export const getUserPlayerAcls = (params: FindAllUserPlayerAclsParams) =>
  getPaginatedData<FindAllUserPlayerAclsParams, UserPlayerAclDto>(
    params,
    moduleName,
  )

export const deleteUserPlayerAcl = (id: string) =>
  deleteDocument<UserPlayerAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateUserPlayerAclDto
}
export const updateUserPlayerAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateUserPlayerAclDto, UserPlayerAclDto>(id, data, moduleName)

export const createUserPlayerAcl = (data: CreateUserPlayerAclDto) =>
  createDocument<CreateUserPlayerAclDto, UserPlayerAclDto>(data, moduleName)

export const getUserPlayerAclById = (id: string, token?: string) =>
  getAssetById<UserPlayerAclDto>({ moduleName, id, token })

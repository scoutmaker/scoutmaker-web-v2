import {
  CreateUserPlayerAceDto,
  FindAllUserPlayerAcesParams,
  UpdateUserPlayerAceDto,
  UserPlayerAceDto,
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

export const getUserPlayerAces = (params: FindAllUserPlayerAcesParams) =>
  getPaginatedData<FindAllUserPlayerAcesParams, UserPlayerAceDto>(
    params,
    moduleName,
  )

export const deleteUserPlayerAce = (id: string) =>
  deleteDocument<UserPlayerAceDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateUserPlayerAceDto
}
export const updateUserPlayerAce = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateUserPlayerAceDto, UserPlayerAceDto>(id, data, moduleName)

export const createUserPlayerAce = (data: CreateUserPlayerAceDto) =>
  createDocument<CreateUserPlayerAceDto, UserPlayerAceDto>(data, moduleName)

export const getUserPlayerAceById = (id: string, token?: string) =>
  getAssetById<UserPlayerAceDto>({ moduleName, id, token })

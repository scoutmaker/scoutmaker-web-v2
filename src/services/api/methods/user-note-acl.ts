import {
  CreateUserNoteAclDto,
  FindAllUserNoteAclParams,
  UpdateUserNoteAclDto,
  UserNoteAclDto,
} from '@/modules/user-note-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'user-note-acl'

export const getUserNoteAcls = (params: FindAllUserNoteAclParams) =>
  getPaginatedData<FindAllUserNoteAclParams, UserNoteAclDto>(params, moduleName)

export const deleteUserNoteAcl = (id: string) =>
  deleteDocument<UserNoteAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateUserNoteAclDto
}
export const updateUserNoteAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateUserNoteAclDto, UserNoteAclDto>(id, data, moduleName)

export const createUserNoteAcl = (data: CreateUserNoteAclDto) =>
  createDocument<CreateUserNoteAclDto, UserNoteAclDto>(data, moduleName)

export const getUserNoteAclById = (id: string, token?: string) =>
  getAssetById<UserNoteAclDto>({ moduleName, id, token })

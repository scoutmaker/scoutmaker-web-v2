import {
  CreateUserInsiderNoteAclDto,
  FindAllUserInsiderNoteAclParams,
  UpdateUserInsiderNoteAclDto,
  UserInsiderNoteAclDto,
} from '@/modules/user-insider-note-acl/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'user-insider-note-acl'

export const getUserInsiderNoteAcls = (
  params: FindAllUserInsiderNoteAclParams,
) =>
  getPaginatedData<FindAllUserInsiderNoteAclParams, UserInsiderNoteAclDto>(
    params,
    moduleName,
  )

export const deleteUserInsiderNoteAcl = (id: string) =>
  deleteDocument<UserInsiderNoteAclDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateUserInsiderNoteAclDto
}
export const updateUserInsiderNoteAcl = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateUserInsiderNoteAclDto, UserInsiderNoteAclDto>(
    id,
    data,
    moduleName,
  )

export const CreateUserInsiderNoteAcl = (data: CreateUserInsiderNoteAclDto) =>
  createDocument<CreateUserInsiderNoteAclDto, UserInsiderNoteAclDto>(
    data,
    moduleName,
  )

export const getUserInsiderNoteAclById = (id: string, token?: string) =>
  getAssetById<UserInsiderNoteAclDto>({ moduleName, id, token })

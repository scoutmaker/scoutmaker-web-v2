import {
  createUserNoteAcl,
  deleteUserNoteAcl,
  getUserNoteAcls,
  updateUserNoteAcl,
} from '@/services/api/methods/user-note-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateUserNoteAclDto,
  FindAllUserNoteAclParams,
  UpdateUserNoteAclDto,
  UserNoteAclDto,
} from './types'

const moduleName: TModuleName = 'user-note-acl'

export const useUserNoteAcls = (params: FindAllUserNoteAclParams) =>
  usePaginatedData<FindAllUserNoteAclParams, UserNoteAclDto>(
    moduleName,
    params,
    getUserNoteAcls,
  )

export const useDeleteUserNoteAcl = () =>
  useDeleteDocument<UserNoteAclDto>(moduleName, deleteUserNoteAcl)

export const useUpdateUserNoteAcl = (id: string) =>
  useUpdateDocument<UpdateUserNoteAclDto, UserNoteAclDto>(
    moduleName,
    id,
    updateUserNoteAcl,
  )

export const useCreateUserNoteAcl = () =>
  useCreateDocument<CreateUserNoteAclDto, UserNoteAclDto>(
    moduleName,
    createUserNoteAcl,
  )

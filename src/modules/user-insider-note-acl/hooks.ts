import {
  CreateUserInsiderNoteAcl,
  deleteUserInsiderNoteAcl,
  getUserInsiderNoteAcls,
  updateUserInsiderNoteAcl,
} from '@/services/api/methods/user-insider-note-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateUserInsiderNoteAclDto,
  FindAllUserInsiderNoteAclParams,
  UpdateUserInsiderNoteAclDto,
  UserInsiderNoteAclDto,
} from './types'

const moduleName: TModuleName = 'user-insider-note-acl'

export const useUserInsiderNoteAcls = (
  params: FindAllUserInsiderNoteAclParams,
) =>
  usePaginatedData<FindAllUserInsiderNoteAclParams, UserInsiderNoteAclDto>(
    moduleName,
    params,
    getUserInsiderNoteAcls,
  )

export const useDeleteUserInsiderNoteAcl = () =>
  useDeleteDocument<UserInsiderNoteAclDto>(moduleName, deleteUserInsiderNoteAcl)

export const useUpdateUserInsiderNoteAcl = (id: string) =>
  useUpdateDocument<UpdateUserInsiderNoteAclDto, UserInsiderNoteAclDto>(
    moduleName,
    id,
    updateUserInsiderNoteAcl,
  )

export const useCreateUserInsiderNoteAcl = () =>
  useCreateDocument<CreateUserInsiderNoteAclDto, UserInsiderNoteAclDto>(
    moduleName,
    CreateUserInsiderNoteAcl,
  )

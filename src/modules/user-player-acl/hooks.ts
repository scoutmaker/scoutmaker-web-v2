import {
  createUserPlayerAcl,
  deleteUserPlayerAcl,
  getUserPlayerAcls,
  updateUserPlayerAcl,
} from '@/services/api/methods/user-player-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateUserPlayerAclDto,
  FindAllUserPlayerAclsParams,
  UpdateUserPlayerAclDto,
  UserPlayerAclDto,
} from './types'

const moduleName: TModuleName = 'user-player-acl'

export const useUserPlayerAcls = (params: FindAllUserPlayerAclsParams) =>
  usePaginatedData<FindAllUserPlayerAclsParams, UserPlayerAclDto>(
    moduleName,
    params,
    getUserPlayerAcls,
  )

export const useDeleteUserPlayerAcl = () =>
  useDeleteDocument<UserPlayerAclDto>(moduleName, deleteUserPlayerAcl)

export const useUpdateUserPlayerAcl = (id: string) =>
  useUpdateDocument<UpdateUserPlayerAclDto, UserPlayerAclDto>(
    moduleName,
    id,
    updateUserPlayerAcl,
  )

export const useCreateUserPlayerAcl = () =>
  useCreateDocument<CreateUserPlayerAclDto, UserPlayerAclDto>(
    moduleName,
    createUserPlayerAcl,
  )

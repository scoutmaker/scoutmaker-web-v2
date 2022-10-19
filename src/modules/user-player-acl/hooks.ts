import {
  createUserPlayerAce,
  deleteUserPlayerAce,
  getUserPlayerAces,
  updateUserPlayerAce,
} from '@/services/api/methods/user-player-acl'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateUserPlayerAceDto,
  FindAllUserPlayerAcesParams,
  UpdateUserPlayerAceDto,
  UserPlayerAceDto,
} from './types'

const moduleName: TModuleName = 'user-player-acl'

export const useUserPlayerAces = (params: FindAllUserPlayerAcesParams) =>
  usePaginatedData<FindAllUserPlayerAcesParams, UserPlayerAceDto>(
    moduleName,
    params,
    getUserPlayerAces,
  )

export const useDeleteUserPlayerAce = () =>
  useDeleteDocument<UserPlayerAceDto>(moduleName, deleteUserPlayerAce)

export const useUpdateUserPlayerAce = (id: string) =>
  useUpdateDocument<UpdateUserPlayerAceDto, UserPlayerAceDto>(
    moduleName,
    id,
    updateUserPlayerAce,
  )

export const useCreateUserPlayerAce = () =>
  useCreateDocument<CreateUserPlayerAceDto, UserPlayerAceDto>(
    moduleName,
    createUserPlayerAce,
  )

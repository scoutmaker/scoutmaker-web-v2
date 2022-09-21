import {
  CreateUserFootballRoleDto,
  FindAllUserFootballRolesDto,
  UpdateUserFootballRoleDto,
  UserFootballRoleDto,
} from '@/modules/user-football-roles/types'
import {
  createUserFootballRole,
  deleteUserFootballRole,
  getUserFootballRoles,
  getUserFootballRolesList,
  updateUserFootballRole,
} from '@/services/api/methods/user-football-roles'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'user-football-roles'

export const useUserFootballRolesList = () =>
  useList<UserFootballRoleDto>(moduleName, getUserFootballRolesList)

export const useUserFootballRoles = (params: FindAllUserFootballRolesDto) =>
  usePaginatedData<FindAllUserFootballRolesDto, UserFootballRoleDto>(
    moduleName,
    params,
    getUserFootballRoles,
  )

export const useDeleteUserFootballRole = () =>
  useDeleteDocument<UserFootballRoleDto>(moduleName, deleteUserFootballRole)

export const useUpdateUserFootballRole = (id: string) =>
  useUpdateDocument<UpdateUserFootballRoleDto, UserFootballRoleDto>(
    moduleName,
    id,
    updateUserFootballRole,
  )

export const useCreateUserFootballRole = () =>
  useCreateDocument<CreateUserFootballRoleDto, UserFootballRoleDto>(
    moduleName,
    createUserFootballRole,
  )

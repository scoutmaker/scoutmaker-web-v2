import {
  getUsers,
  getUsersList,
  setPMScoutRoleUser,
  setScoutRoleUser,
} from '@/services/api/methods/users'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useToggleActiveDocument } from '@/utils/hooks/api/use-toggle-active-document'

import { FindAllUsersParams, UserBasicDataDto, UserDto } from './types'

const moduleName: TModuleName = 'users'

export const useUsersList = () =>
  useList<UserBasicDataDto>(moduleName, getUsersList)

export const useUsers = (params: FindAllUsersParams) =>
  usePaginatedData<FindAllUsersParams, UserDto>(moduleName, params, getUsers)

export const useSetScoutRoleUser = () =>
  useToggleActiveDocument<UserDto>(moduleName, setScoutRoleUser)

export const useSetPMScoutRoleUser = () =>
  useToggleActiveDocument<UserDto>(moduleName, setPMScoutRoleUser)

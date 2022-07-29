import { UserFootballRoleDto } from '@/modules/user-football-roles/types'
import { getUserFootballRolesList } from '@/services/api/methods/user-football-roles'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'user-football-roles'

export const useUserFootballRolesList = () =>
  useList<UserFootballRoleDto>(moduleName, getUserFootballRolesList)

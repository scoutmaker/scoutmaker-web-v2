import { UserFootballRoleDto } from '@/modules/user-football-roles/types'
import { getDataList } from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'user-football-roles'

export const getUserFootballRolesList = () =>
  getDataList<UserFootballRoleDto>(moduleName)

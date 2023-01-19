import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'

import { rolesComboData } from './role-select'

export type UserDto = Components.Schemas.UserDto
export type UserBasicDataDto = Components.Schemas.UserBasicDataDto

export type FindAllUsersParams = Pick<
  Paths.UsersControllerFindAll.QueryParameters,
  | 'limit'
  | 'name'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'clubIds'
  | 'footballRoleIds'
  | 'regionIds'
  | 'roles'
  | 'hasScoutProfile'
>

export type UsersFiltersDto = Pick<
  FindAllUsersParams,
  | 'name'
  | 'clubIds'
  | 'footballRoleIds'
  | 'regionIds'
  | 'roles'
  | 'hasScoutProfile'
>

export type UsersFiltersState = Omit<
  UsersFiltersDto,
  'clubIds' | 'footballRoleIds' | 'regionIds' | 'roles'
> & {
  clubIds: IStandardComboOptions[]
  footballRoleIds: IStandardComboOptions[]
  regionIds: IStandardComboOptions[]
  roles: typeof rolesComboData
}

export type UsersSortBy = Paths.UsersControllerFindAll.Parameters.SortBy

export interface IUsersComboOptions extends IComboOptions {
  firstName: string
  lastName: string
}

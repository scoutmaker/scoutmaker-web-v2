import { IComboOptions } from '@/components/combo/types'

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
  | 'role'
>

export type UsersFiltersDto = Pick<
  FindAllUsersParams,
  'name' | 'clubIds' | 'footballRoleIds' | 'regionIds' | 'role'
>

export type UsersFiltersState = Omit<
  UsersFiltersDto,
  'clubIds' | 'footballRoleIds' | 'regionIds' | 'role'
> & {
  clubIds: IComboOptions[]
  footballRoleIds: IComboOptions[]
  regionIds: IComboOptions[]
  role: IComboOptions | null
}

export type UsersSortBy = Paths.UsersControllerFindAll.Parameters.SortBy

export interface IUsersComboOptions extends IComboOptions {
  firstName: string
  lastName: string
}

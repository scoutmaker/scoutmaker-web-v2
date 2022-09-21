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

export type UsersSortBy = Paths.UsersControllerFindAll.Parameters.SortBy

export type UserFootballRoleDto = Components.Schemas.UserFootballRoleDto

export type CreateUserFootballRoleDto =
  Components.Schemas.CreateUserFootballRoleDto

export type UpdateUserFootballRoleDto =
  Components.Schemas.UpdateUserFootballRoleDto

export type FindAllUserFootballRolesDto = Pick<
  Paths.UserFootballRolesControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type UserFootballRolesFiltersDto = Pick<
  FindAllUserFootballRolesDto,
  'name'
>

export type UserFootballRolesSortBy =
  Paths.UserFootballRolesControllerFindAll.Parameters.SortBy

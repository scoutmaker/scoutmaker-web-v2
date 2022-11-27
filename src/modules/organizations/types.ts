export type OrganizationDto = Components.Schemas.OrganizationDto

export type OrganizationBasicDataDto =
  Components.Schemas.OrganizationBasicDataDto

export type CreateOrganizationDto = Components.Schemas.CreateOrganizationDto

export type UpdateOrganizationDto = Components.Schemas.UpdateOrganizationDto

export type FindAllOrganizationsParams = Pick<
  Paths.OrganizationsControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type OrganizationsFiltersDto = Pick<FindAllOrganizationsParams, 'name'>

export type OrganizationsSortBy =
  Paths.OrganizationsControllerFindAll.Parameters.SortBy

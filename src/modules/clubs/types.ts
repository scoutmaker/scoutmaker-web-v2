export type ClubBasicDataDto = Components.Schemas.ClubBasicDataDto
export type FindAllClubsParams = Pick<
  Paths.ClubsControllerFindAll.QueryParameters,
  | 'name'
  | 'countryId'
  | 'limit'
  | 'page'
  | 'regionId'
  | 'sortBy'
  | 'sortingOrder'
>
export type ClubsFiltersDto = Pick<
  FindAllClubsParams,
  'name' | 'countryId' | 'regionId'
>
export type ClubsSortBy = Paths.ClubsControllerFindAll.Parameters.SortBy
export type ClubDto = Components.Schemas.ClubDto
export type CreateClubDto = Components.Schemas.CreateClubDto
export type UpdateClubDto = Components.Schemas.UpdateClubDto

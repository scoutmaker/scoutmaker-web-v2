export type ClubBasicDataDto = Components.Schemas.ClubBasicDataDto
export type FindAllClubsParams = Paths.ClubsControllerFindAll.QueryParameters
export type ClubsFiltersDto = Pick<
  FindAllClubsParams,
  'name' | 'countryId' | 'regionId'
>
export type ClubsSortBy = Paths.ClubsControllerFindAll.Parameters.SortBy
export type ClubDto = Components.Schemas.ClubDto

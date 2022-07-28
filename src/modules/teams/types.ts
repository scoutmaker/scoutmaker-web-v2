export type TeamBasicDataDto = Components.Schemas.TeamBasicDataDto
export type FindAllTeamsParams = Pick<
  Paths.TeamsControllerFindAll.QueryParameters,
  | 'clubId'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'isLiked'
  | 'limit'
  | 'name'
  | 'page'
  | 'regionIds'
  | 'sortBy'
  | 'sortingOrder'
>
export type TeamsFiltersDto = Pick<
  FindAllTeamsParams,
  | 'clubId'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'isLiked'
  | 'name'
  | 'regionIds'
>
export type TeamsSortBy = Paths.TeamsControllerFindAll.Parameters.SortBy
export type TeamDto = Components.Schemas.TeamDto
export type CreateTeamDto = Components.Schemas.CreateTeamDto
export type UpdateTeamDto = Components.Schemas.UpdateTeamDto

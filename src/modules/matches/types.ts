export type MatchBasicDataDto = Components.Schemas.MatchBasicDataDto
export type FindAllMatchesParams = Pick<
  Paths.MatchesControllerFindAll.QueryParameters,
  | 'competitionIds'
  | 'groupIds'
  | 'hasVideo'
  | 'limit'
  | 'page'
  | 'seasonId'
  | 'sortBy'
  | 'sortingOrder'
  | 'teamId'
>
export type MatchesFiltersDto = Pick<
  FindAllMatchesParams,
  'competitionIds' | 'groupIds' | 'hasVideo' | 'seasonId' | 'teamId'
>
export type MatchesSortBy = Paths.MatchesControllerFindAll.Parameters.SortBy
export type MatchDto = Components.Schemas.MatchDto
export type CreateMatchDto = Components.Schemas.CreateMatchDto
export type UpdateMatchDto = Components.Schemas.UpdateMatchDto

export type FindAllTeamAffiliationsParams = Pick<
  Paths.TeamAffiliationsControllerFindAll.QueryParameters,
  'limit' | 'page' | 'playerId' | 'sortBy' | 'sortingOrder' | 'teamId'
>

export type TeamAffiliationsFilterDto = Pick<
  FindAllTeamAffiliationsParams,
  'playerId' | 'teamId'
>

export type TeamAffiliationsSortBy =
  Paths.TeamAffiliationsControllerFindAll.Parameters.SortBy

export type TeamAffiliationDto = Components.Schemas.TeamAffiliationDto

export type CreateTeamAffiliationDto =
  Components.Schemas.CreateTeamAffiliationDto

export type UpdateTeamAffiliationDto =
  Components.Schemas.UpdateTeamAffiliationDto

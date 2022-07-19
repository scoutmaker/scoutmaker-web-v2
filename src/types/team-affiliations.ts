export type FindAllTeamAffiliationsParams =
  Paths.TeamAffiliationsControllerFindAll.QueryParameters

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

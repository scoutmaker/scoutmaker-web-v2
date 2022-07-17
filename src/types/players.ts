export type PlayerBasicDataDto = Components.Schemas.PlayerBasicDataDto
export type FindAllPlayersParams =
  Paths.PlayersControllerFindAll.QueryParameters
export type PlayersFiltersDto = Pick<
  FindAllPlayersParams,
  | 'bornAfter'
  | 'bornBefore'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'footed'
  | 'isLiked'
  | 'name'
  | 'positionIds'
  | 'teamIds'
>
export type PlayersSortBy = Paths.PlayersControllerFindAll.Parameters.SortBy
export type PlayerDto = Components.Schemas.PlayerDto
export type CreatePlayerDto = Components.Schemas.CreatePlayerDto
export type UpdatePlayerDto = Components.Schemas.UpdatePlayerDto

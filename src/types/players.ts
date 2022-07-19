export type PlayerBasicDataDto = Components.Schemas.PlayerBasicDataDto

export type FindAllPlayersParams = Omit<
  Paths.PlayersControllerFindAll.QueryParameters,
  'footed'
> & { footed: Footed | '' }

export type Footed = Paths.PlayersControllerFindAll.Parameters.Footed

export type PlayersFiltersDto = Pick<
  FindAllPlayersParams,
  | 'bornAfter'
  | 'bornBefore'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'countryIds'
  | 'isLiked'
  | 'footed'
  | 'name'
  | 'positionIds'
  | 'teamIds'
>

// export type PlayersFilterFormValues = Omit<PlayersFiltersDto, 'footed'> & {
//   footed: Footed | ''
// }

export type PlayersSortBy = Paths.PlayersControllerFindAll.Parameters.SortBy

export type PlayerDto = Omit<Components.Schemas.PlayerDto, '_count'> & {
  _count: { reports: number; notes: number }
}

export type CreatePlayerDto = Components.Schemas.CreatePlayerDto

export type UpdatePlayerDto = Components.Schemas.UpdatePlayerDto

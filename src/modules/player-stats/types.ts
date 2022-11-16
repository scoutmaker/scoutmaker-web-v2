import { IStandardComboOptions } from '@/components/combo/types'

import { IMatchComboOptions } from '../matches/types'
import { IPlayerComboOptions } from '../players/types'

export type PlayerStatsDto = Components.Schemas.PlayerStatsDto

export type CreatePlayerStatsDto = Components.Schemas.CreatePlayerStatsDto

export type UpdatePlayerStatsDto = Components.Schemas.UpdatePlayerStatsDto

export type FindAllPlayerStatsParams = Pick<
  Paths.PlayerStatsControllerFindAll.QueryParameters,
  | 'limit'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'matchId'
  | 'playerId'
  | 'teamId'
>

export type PlayerStatsFiltersDto = Pick<
  FindAllPlayerStatsParams,
  'matchId' | 'playerId' | 'teamId'
>

export type PlayerStatsFiltersState = Omit<
  PlayerStatsFiltersDto,
  'matchId' | 'playerId' | 'teamId'
> & {
  matchId: IMatchComboOptions | null
  playerId: IPlayerComboOptions | null
  teamId: IStandardComboOptions | null
}

export type PlayerStatsSortBy =
  Paths.PlayerStatsControllerFindAll.Parameters.SortBy

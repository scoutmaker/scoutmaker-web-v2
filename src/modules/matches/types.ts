import { IComboOptions } from '@/components/combo/types'

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
  | 'orderId'
>
export type MatchesFiltersDto = Pick<
  FindAllMatchesParams,
  'competitionIds' | 'groupIds' | 'hasVideo' | 'seasonId' | 'teamId' | 'orderId'
>

export type MatchesFiltersState = Omit<
  MatchesFiltersDto,
  'competitionIds' | 'groupIds' | 'seasonId' | 'teamId'
> & {
  competitionIds: IComboOptions[]
  groupIds: IComboOptions[]
  seasonId: IComboOptions | null
  teamId: IComboOptions | null
}

export type MatchesSortBy = Paths.MatchesControllerFindAll.Parameters.SortBy
export type MatchDto = Omit<Components.Schemas.MatchDto, '_count'> & {
  _count: { reports: number; notes: number }
}
export type CreateMatchDto = Components.Schemas.CreateMatchDto
export type UpdateMatchDto = Components.Schemas.UpdateMatchDto

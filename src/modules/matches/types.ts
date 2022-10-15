import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'

import { ICompetitionGroupComboOptions } from '../competition-groups/types'
import {
  CompetitionBasicDataDto,
  ICompetitionComboOptions,
} from '../competitions/types'
import { ISeasonComboOptions } from '../seasons/types'
import { TeamBasicDataDto } from '../teams/types'

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
  competitionIds: ICompetitionComboOptions[]
  groupIds: ICompetitionGroupComboOptions[]
  seasonId: ISeasonComboOptions | null
  teamId: IStandardComboOptions | null
}

export type MatchesSortBy = Paths.MatchesControllerFindAll.Parameters.SortBy
export type MatchDto = Omit<Components.Schemas.MatchDto, '_count'> & {
  _count: { reports: number; notes: number }
}
export type CreateMatchDto = Components.Schemas.CreateMatchDto
export type UpdateMatchDto = Components.Schemas.UpdateMatchDto

export interface IMatchComboOptions extends IComboOptions {
  date: string
  homeTeam: TeamBasicDataDto
  awayTeam: TeamBasicDataDto
  competition: CompetitionBasicDataDto
}

import { IComboOptions } from '@/components/combo/types'

import { ICompetitionGroupComboOptions } from '../competition-groups/types'
import { IPlayerComboOptions } from '../players/types'

export type PlayerGradeDto = Components.Schemas.PlayerGradeDto

export type CreatePlayerGradeDto = Components.Schemas.CreatePlayerGradeDto

export type UpdatePlayerGradeDto = Components.Schemas.UpdatePlayerGradeDto

export type FindAllPlayerGradesParams = Pick<
  Paths.PlayerGradesControllerFindAll.QueryParameters,
  | 'limit'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'competitionIds'
  | 'grades'
  | 'playerIds'
>

export type PlayerGradesFiltersDto = Pick<
  FindAllPlayerGradesParams,
  'competitionIds' | 'grades' | 'playerIds'
>

export type PlayerGradesFiltersState = Omit<
  PlayerGradesFiltersDto,
  'playerIds' | 'competitionIds' | 'grades'
> & {
  playerIds: IPlayerComboOptions[]
  competitionIds: ICompetitionGroupComboOptions[]
  grades: IComboOptions[]
}

export type PlayerGradesSortBy =
  Paths.PlayerGradesControllerFindAll.Parameters.SortBy

export interface IPlayerGradesComboOptions extends IComboOptions {}

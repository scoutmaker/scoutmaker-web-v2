import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'

import {
  CompetitionBasicDataDto,
  ICompetitionComboOptions,
} from '../competitions/types'

export type CompetitionGroupBasicDataDto =
  Components.Schemas.CompetitionGroupBasicDataDto

export type CompetitionGroupDto = Components.Schemas.CompetitionGroupDto

export type CreateCompetitionGroupDto =
  Components.Schemas.CreateCompetitionGroupDto

export type UpdateCompetitionGroupDto =
  Components.Schemas.UpdateCompetitionGroupDto

export type FindAllCompetitionGroupsParams = Pick<
  Paths.CompetitionGroupsControllerFindAll.QueryParameters,
  | 'competitionIds'
  | 'limit'
  | 'name'
  | 'page'
  | 'regionIds'
  | 'sortBy'
  | 'sortingOrder'
>

export type CompetitionGroupsFiltersDto = Pick<
  FindAllCompetitionGroupsParams,
  'competitionIds' | 'regionIds' | 'name'
>

export type CompetitionGroupsFiltersState = Omit<
  CompetitionGroupsFiltersDto,
  'competitionIds' | 'regionIds'
> & {
  competitionIds: ICompetitionComboOptions[]
  regionIds: IStandardComboOptions[]
}

export type CompetitionGroupsSortBy =
  Paths.CompetitionGroupsControllerFindAll.Parameters.SortBy

export interface ICompetitionGroupComboOptions extends IComboOptions {
  name: string
  competition: CompetitionBasicDataDto
}

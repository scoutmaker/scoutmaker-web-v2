import { IComboOptions } from '@/components/combo/types'

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
  competitionIds: IComboOptions[]
  regionIds: IComboOptions[]
}

export type CompetitionGroupsSortBy =
  Paths.CompetitionGroupsControllerFindAll.Parameters.SortBy

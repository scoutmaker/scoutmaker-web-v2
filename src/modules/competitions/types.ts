import { IComboOptions } from '@/components/combo/types'

export type CompetitionBasicDataDto = Components.Schemas.CompetitionBasicDataDto
export type CompetitionParticipationWithoutTeamDto =
  Components.Schemas.CompetitionParticipationWithoutTeamDto

export type CompetitionDto = Components.Schemas.CompetitionDto

export type CreateCompetitonDto = Components.Schemas.CreateCompetitionDto

export type UpdateCompetitionDto = Components.Schemas.UpdateCompetitionDto

export type FindAllCompetitionsParams = Pick<
  Paths.CompetitionsControllerFindAll.QueryParameters,
  | 'ageCategoryId'
  | 'countryId'
  | 'gender'
  | 'juniorLevelId'
  | 'level'
  | 'limit'
  | 'name'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'typeId'
>

export interface CompetitionsFiltersDto
  extends Omit<
    Pick<
      FindAllCompetitionsParams,
      | 'ageCategoryId'
      | 'countryId'
      | 'gender'
      | 'juniorLevelId'
      | 'level'
      | 'name'
      | 'typeId'
    >,
    'level'
  > {
  level?: number | ''
}

export type CompetitionsFiltersState = Omit<
  CompetitionsFiltersDto,
  'ageCategoryId' | 'countryId' | 'juniorLevelId' | 'typeId' | 'gender'
> & {
  ageCategoryId: IComboOptions | null
  countryId: IComboOptions | null
  juniorLevelId: IComboOptions | null
  typeId: IComboOptions | null
  gender: Paths.CompetitionsControllerFindAll.Parameters.Gender | ''
}

export type CompetitionsSortBy =
  Paths.CompetitionsControllerFindAll.Parameters.SortBy

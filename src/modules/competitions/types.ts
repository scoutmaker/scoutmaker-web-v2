import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'

import { CountryDto, ICountryComboOptions } from '../countries/types'

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
  ageCategoryId: IStandardComboOptions | null
  countryId: ICountryComboOptions | null
  juniorLevelId: IStandardComboOptions | null
  typeId: IStandardComboOptions | null
  gender: IComboOptions | null
}

export type CompetitionsSortBy =
  Paths.CompetitionsControllerFindAll.Parameters.SortBy

export interface ICompetitionComboOptions extends IComboOptions {
  name: string
  level: number
  country: CountryDto
}

import { IComboOptions } from '@/components/combo/types'

export type SeasonDto = Components.Schemas.SeasonDto

export type CreateSeasonDto = Components.Schemas.CreateSeasonDto

export type UpdateSeasonDto = Components.Schemas.UpdateSeasonDto

export type FindAllSeasonsParams = Pick<
  Paths.SeasonsControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type SeasonsFiltersDto = Pick<FindAllSeasonsParams, 'name'>

export type SeasonsSortBy = Paths.SeasonsControllerFindAll.Parameters.SortBy

export interface ISeasonComboOptions extends IComboOptions {
  name: string
  isActive: boolean
  startDate: string
  endDate: string
}

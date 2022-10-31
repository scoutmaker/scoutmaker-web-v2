import { IComboOptions } from '@/components/combo/types'

export type PlayerPositionDto = Components.Schemas.PlayerPositionDto

export type CreatePlayerPostitionDto =
  Components.Schemas.CreatePlayerPositionDto

export type UpdatePlayerPostitionDto =
  Components.Schemas.UpdatePlayerPositionDto

export type FindAllPlayerPositionsParams = Pick<
  Paths.PlayerPositionsControllerFindAll.QueryParameters,
  'code' | 'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type PlayerPositionsFiltersDto = Pick<
  FindAllPlayerPositionsParams,
  'code' | 'name'
>

export type PlayerPositionsSortBy =
  Paths.PlayerPositionsControllerFindAll.Parameters.SortBy

export interface IPlayerPositionComboOptions extends IComboOptions {
  name: string
  code: string
}

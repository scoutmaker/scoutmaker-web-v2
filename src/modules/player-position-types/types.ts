import { IComboOptions } from '@/components/combo/types'

export type PlayerPositionTypeDto = Components.Schemas.PlayerPositionTypeDto

export type CreatePlayerPostitionTypeDto =
  Components.Schemas.CreatePlayerPositionTypeDto

export type UpdatePlayerPostitionTypeDto =
  Components.Schemas.UpdatePlayerPositionTypeDto

export type FindAllPlayerPositionsTypesParams = Pick<
  Paths.PlayerPositionTypesControllerFindAll.QueryParameters,
  'code' | 'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type PlayerPositionsTypesFiltersDto = Pick<
  FindAllPlayerPositionsTypesParams,
  'code' | 'name'
>

export type PlayerPositionTypesSortBy =
  Paths.PlayerPositionTypesControllerFindAll.Parameters.SortBy

export interface IPlayerPositionTypeComboOptions extends IComboOptions {
  name: string
  code: string
}

import { IComboOptions, IStandardComboOptions } from '@/components/combo/types'

import { IMatchComboOptions } from '../matches/types'
import { IPlayerComboOptions } from '../players/types'

export type OrderDto = Components.Schemas.OrderDto
export type OrderBasicDataDto = Components.Schemas.OrderBasicDataDto

export type CreateOrderDto = Components.Schemas.CreateOrderDto

export type FindAllOrdersParams = Pick<
  Paths.OrdersControllerFindAll.QueryParameters,
  | 'createdAfter'
  | 'createdBefore'
  | 'limit'
  | 'matchIds'
  | 'page'
  | 'playerIds'
  | 'sortBy'
  | 'sortingOrder'
  | 'status'
  | 'teamIds'
  | 'userId'
>

export interface OrdersFiltersDto
  extends Pick<
    FindAllOrdersParams,
    | 'createdAfter'
    | 'createdBefore'
    | 'matchIds'
    | 'playerIds'
    | 'status'
    | 'teamIds'
    | 'userId'
  > {
  onlyMine?: boolean
}

export type OrdersFiltersState = Omit<
  OrdersFiltersDto,
  'playerIds' | 'matchIds' | 'teamIds' | 'status'
> & {
  playerIds: IPlayerComboOptions[]
  matchIds: IMatchComboOptions[]
  teamIds: IStandardComboOptions[]
  status: IComboOptions | null
}

export interface OrdersBasicFiltersDto
  extends Omit<OrdersFiltersDto, 'onlyMine'> {}

export type OrdersSortBy = Paths.OrdersControllerFindAll.Parameters.SortBy

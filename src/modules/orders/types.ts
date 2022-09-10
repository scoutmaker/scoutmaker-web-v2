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

export interface OrdersBasicFiltersDto
  extends Omit<OrdersFiltersDto, 'onlyMine'> {}

export type OrdersSortBy = Paths.OrdersControllerFindAll.Parameters.SortBy

export type OrderDto = Components.Schemas.OrderDto

export type CreateOrderDto = Components.Schemas.CreateOrderDto

// export type UpdateOrderDto = Components.Schemas.UpdateOrde

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

export type OrdersFiltersDto = Pick<
  FindAllOrdersParams,
  | 'createdAfter'
  | 'createdBefore'
  | 'matchIds'
  | 'playerIds'
  | 'status'
  | 'teamIds'
  | 'userId'
>

export type OrdersSortBy = Paths.OrdersControllerFindAll.Parameters.SortBy

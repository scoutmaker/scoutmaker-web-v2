export type UserSubscriptionDto = Components.Schemas.UserSubscriptionDto

export type CreateUserSubscriptionDto =
  Components.Schemas.CreateUserSubscriptionDto

export type UpdateUserSubscriptionDto =
  Components.Schemas.UpdateUserSubscriptionDto

export type FindAllUserSubscriptionsParams = Pick<
  Paths.UserSubscriptionsControllerFindAll.QueryParameters,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'limit'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'userId'
>

export type UserSubscriptionsFiltersDto = Pick<
  FindAllUserSubscriptionsParams,
  'competitionGroupIds' | 'competitionIds' | 'userId'
>

export type UserSubscriptionsSortBy =
  Paths.UserSubscriptionsControllerFindAll.Parameters.SortBy

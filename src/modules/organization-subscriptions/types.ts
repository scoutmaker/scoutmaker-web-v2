export type OrganizationSubscriptionDto =
  Components.Schemas.OrganizationSubscriptionDto

export type CreateOrganizationSubscriptionDto =
  Components.Schemas.CreateOrganizationSubscriptionDto

export type UpdateOrganizationSubscriptionDto =
  Components.Schemas.UpdateOrganizationSubscriptionDto

export type FindAllOrganizationSubscriptionsParams = Pick<
  Paths.OrganizationSubscriptionsControllerFindAll.QueryParameters,
  | 'limit'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'organizationId'
>

export type OrganizationSubscriptionsFiltersDto = Pick<
  FindAllOrganizationSubscriptionsParams,
  'competitionGroupIds' | 'competitionIds' | 'organizationId'
>

export type OrganizationSubscriptionsSortBy =
  Paths.OrganizationSubscriptionsControllerFindAll.Parameters.SortBy

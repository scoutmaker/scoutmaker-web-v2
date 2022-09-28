import { CompetitionGroupBasicDataDto } from '../competition-groups/types'
import { CompetitionBasicDataDto } from '../competitions/types'

export interface UserSubscriptionDto
  extends Omit<
    Components.Schemas.UserSubscriptionDto,
    'competitions' | 'competitionGroups'
  > {
  competitions: CompetitionBasicDataDto[]
  competitionGroups: CompetitionGroupBasicDataDto[]
}

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

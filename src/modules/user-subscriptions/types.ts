import {
  CompetitionGroupBasicDataDto,
  ICompetitionGroupComboOptions,
} from '../competition-groups/types'
import {
  CompetitionBasicDataDto,
  ICompetitionComboOptions,
} from '../competitions/types'
import { IUsersComboOptions } from '../users/types'

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

export type UserSubscriptionsFiltersState = Omit<
  UserSubscriptionsFiltersDto,
  'competitionGroupIds' | 'competitionIds' | 'userId'
> & {
  competitionGroupIds: ICompetitionGroupComboOptions[]
  competitionIds: ICompetitionComboOptions[]
  userId: IUsersComboOptions | null
}

export type UserSubscriptionsSortBy =
  Paths.UserSubscriptionsControllerFindAll.Parameters.SortBy

import { IComboOptions } from '@/components/combo/types'

import { CompetitionGroupBasicDataDto } from '../competition-groups/types'
import { CompetitionBasicDataDto } from '../competitions/types'

export interface OrganizationSubscriptionDto
  extends Omit<
    Components.Schemas.OrganizationSubscriptionDto,
    'competitions' | 'competitionGroups'
  > {
  competitions: CompetitionBasicDataDto[]
  competitionGroups: CompetitionGroupBasicDataDto[]
}

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

export type OrganizationSubscriptionsFiltersState = Omit<
  OrganizationSubscriptionsFiltersDto,
  'competitionGroupIds' | 'competitionIds' | 'organizationId'
> & {
  competitionGroupIds: IComboOptions[]
  competitionIds: IComboOptions[]
  organizationId: IComboOptions | null
}

export type OrganizationSubscriptionsSortBy =
  Paths.OrganizationSubscriptionsControllerFindAll.Parameters.SortBy

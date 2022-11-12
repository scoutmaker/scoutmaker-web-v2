import { IStandardComboOptions } from '@/components/combo/types'

import { IPlayerComboOptions } from '../players/types'

export type OrganizationPlayerAclDto =
  Components.Schemas.OrganizationPlayerAceDto

export interface CreateOrganizationPlayerAclDto
  extends Omit<
    Components.Schemas.CreateOrganizationPlayerAceDto,
    'permissionLevel'
  > {
  permissionLevel: OrganizationPlayerAclDto['permissionLevel'] | ''
}

export type UpdateOrganizationPlayerAclDto =
  Components.Schemas.UpdateOrganizationPlayerAceDto

export type FindAllOrganizationPlayerAclsParams = Pick<
  Paths.OrganizationPlayerAclControllerFindAll.QueryParameters,
  'limit' | 'organizationId' | 'page' | 'playerId' | 'sortBy' | 'sortingOrder'
>

export type OrganizationPlayerAclFiltersDto = Pick<
  FindAllOrganizationPlayerAclsParams,
  'organizationId' | 'playerId'
>

export type OrganizationPlayerAclFiltersState = Omit<
  OrganizationPlayerAclFiltersDto,
  'playerId' | 'organizationId'
> & {
  playerId: IPlayerComboOptions | null
  organizationId: IStandardComboOptions | null
}

export type OrganizationPlayerAclSortBy =
  Paths.OrganizationPlayerAclControllerFindAll.Parameters.SortBy

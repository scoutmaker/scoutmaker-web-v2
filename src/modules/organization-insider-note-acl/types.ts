import { IStandardComboOptions } from '@/components/combo/types'

import { IInsiderNoteComboOptions } from '../insider-notes/types'

export type OrganizationInsiderNoteAclDto =
  Components.Schemas.OrganizationInsiderNoteAceDto

export interface CreateOrganizationInsiderNoteAclDto
  extends Omit<
    Components.Schemas.CreateOrganizationInsiderNoteAceDto,
    'permissionLevel'
  > {
  permissionLevel: OrganizationInsiderNoteAclDto['permissionLevel'] | ''
}

export type UpdateOrganizationInsiderNoteAclDto =
  Components.Schemas.UpdateOrganizationInsiderNoteAceDto

export type FindAllOrganizationInsiderNoteAclsParams = Pick<
  Paths.OrganizationInsiderNoteAclControllerFindAll.QueryParameters,
  | 'insiderNoteId'
  | 'limit'
  | 'organizationId'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
>

export type OrganizationInsiderNoteAclFiltersDto = Pick<
  FindAllOrganizationInsiderNoteAclsParams,
  'organizationId' | 'insiderNoteId'
>

export type OrganizationInsiderNoteAclFiltersState = Omit<
  OrganizationInsiderNoteAclFiltersDto,
  'organizationId' | 'insiderNoteId'
> & {
  insiderNoteId: IInsiderNoteComboOptions | null
  organizationId: IStandardComboOptions | null
}

export type OrganizationInsiderNoteAclSortBy =
  Paths.OrganizationInsiderNoteAclControllerFindAll.Parameters.SortBy

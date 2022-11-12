import { INotesComboOptions } from '../notes/types'
import { IPlayerComboOptions } from '../players/types'

export type OrganizationNoteAclDto = Components.Schemas.OrganizationNoteAceDto

export interface CreateOrganizationNoteAclDto
  extends Omit<
    Components.Schemas.CreateOrganizationNoteAceDto,
    'permissionLevel'
  > {
  permissionLevel: OrganizationNoteAclDto['permissionLevel'] | ''
}

export type UpdateOrganizationNoteAclDto =
  Components.Schemas.UpdateOrganizationNoteAceDto

export type FindAllOrganizationNoteAclsParams = Pick<
  Paths.OrganizationNoteAclControllerFindAll.QueryParameters,
  'limit' | 'organizationId' | 'page' | 'noteId' | 'sortBy' | 'sortingOrder'
>

export type OrganizationNoteAclFiltersDto = Pick<
  FindAllOrganizationNoteAclsParams,
  'organizationId' | 'noteId'
>

export type OrganizationNoteAclFiltersState = Omit<
  OrganizationNoteAclFiltersDto,
  'noteId' | 'organizationId'
> & {
  playerId: IPlayerComboOptions | null
  noteId: INotesComboOptions | null
}

export type OrganizationNoteAclSortBy =
  Paths.OrganizationNoteAclControllerFindAll.Parameters.SortBy

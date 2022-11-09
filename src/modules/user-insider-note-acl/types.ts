import { IInsiderNoteComboOptions } from '../insider-notes/types'
import { IUsersComboOptions } from '../users/types'

export type UserInsiderNoteAclDto = Components.Schemas.UserInsiderNoteAceDto

export interface CreateUserInsiderNoteAclDto
  extends Omit<
    Components.Schemas.CreateUserInsiderNoteAceDto,
    'permissionLevel'
  > {
  permissionLevel:
    | Components.Schemas.CreateUserInsiderNoteAceDto['permissionLevel']
    | ''
}

export type UpdateUserInsiderNoteAclDto =
  Components.Schemas.UpdateUserInsiderNoteAceDto

export type FindAllUserInsiderNoteAclParams = Pick<
  Paths.UserInsiderNoteAclControllerFindAll.QueryParameters,
  'limit' | 'page' | 'sortBy' | 'sortingOrder' | 'insiderNoteId' | 'userId'
>

export type UserInsiderNoteAclFiltersDto = Pick<
  FindAllUserInsiderNoteAclParams,
  'insiderNoteId' | 'userId'
>

export type UserInsiderNoteAclFiltersState = Omit<
  UserInsiderNoteAclFiltersDto,
  'insiderNoteId' | 'userId'
> & {
  insiderNoteId: IInsiderNoteComboOptions | null
  userId: IUsersComboOptions | null
}

export type UserInsiderNoteAclSortBy =
  Paths.UserInsiderNoteAclControllerFindAll.Parameters.SortBy

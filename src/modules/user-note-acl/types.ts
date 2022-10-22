import { INotesComboOptions } from '../notes/types'
import { IUsersComboOptions } from '../users/types'

export type UserNoteAclDto = Components.Schemas.UserNoteAceDto

export interface CreateUserNoteAclDto
  extends Omit<Components.Schemas.CreateUserNoteAceDto, 'permissionLevel'> {
  permissionLevel:
    | Components.Schemas.CreateUserNoteAceDto['permissionLevel']
    | ''
}

export type UpdateUserNoteAclDto = Components.Schemas.UpdateUserNoteAceDto

export type FindAllUserNoteAclParams = Pick<
  Paths.UserNoteAclControllerFindAll.QueryParameters,
  'limit' | 'noteId' | 'page' | 'sortBy' | 'sortingOrder' | 'userId'
>

export type UserNoteAclFiltersDto = Pick<
  FindAllUserNoteAclParams,
  'noteId' | 'userId'
>

export type UserNoteAclFiltersState = Omit<
  UserNoteAclFiltersDto,
  'noteId' | 'userId'
> & {
  noteId: INotesComboOptions | null
  userId: IUsersComboOptions | null
}

export type UserNoteAclSortBy =
  Paths.UserNoteAclControllerFindAll.Parameters.SortBy

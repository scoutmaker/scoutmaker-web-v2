import { IPlayerComboOptions } from '../players/types'
import { IUsersComboOptions } from '../users/types'

export type UserPlayerAclDto = Components.Schemas.UserPlayerAceDto

export interface CreateUserPlayerAclDto
  extends Omit<Components.Schemas.CreateUserPlayerAceDto, 'permissionLevel'> {
  permissionLevel:
    | Components.Schemas.CreateUserPlayerAceDto['permissionLevel']
    | ''
}

export type UpdateUserPlayerAclDto = Components.Schemas.UpdateUserPlayerAceDto

export type FindAllUserPlayerAclsParams = Pick<
  Paths.UserPlayerAclControllerFindAll.QueryParameters,
  'limit' | 'page' | 'playerId' | 'sortBy' | 'sortingOrder' | 'userId'
>

export type UserPlayerAclFiltersDto = Pick<
  FindAllUserPlayerAclsParams,
  'playerId' | 'userId'
>

export type UserPlayerAclFiltersState = Omit<
  UserPlayerAclFiltersDto,
  'playerId' | 'userId'
> & {
  playerId: IPlayerComboOptions | null
  userId: IUsersComboOptions | null
}

export type UserPlayerAceSortBy =
  Paths.UserPlayerAclControllerFindAll.Parameters.SortBy

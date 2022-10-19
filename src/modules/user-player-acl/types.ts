import { IPlayerComboOptions } from '../players/types'
import { IUsersComboOptions } from '../users/types'

export type UserPlayerAceDto = Components.Schemas.UserPlayerAceDto

export interface CreateUserPlayerAceDto
  extends Omit<Components.Schemas.CreateUserPlayerAceDto, 'permissionLevel'> {
  permissionLevel:
    | Components.Schemas.CreateUserPlayerAceDto['permissionLevel']
    | ''
}

export type UpdateUserPlayerAceDto = Components.Schemas.UpdateUserPlayerAceDto

export type FindAllUserPlayerAcesParams = Pick<
  Paths.UserPlayerAclControllerFindAll.QueryParameters,
  'limit' | 'page' | 'playerId' | 'sortBy' | 'sortingOrder' | 'userId'
>

export type UserPlayerAceFiltersDto = Pick<
  FindAllUserPlayerAcesParams,
  'playerId' | 'userId'
>

export type UserPlayerAceFiltersState = Omit<
  UserPlayerAceFiltersDto,
  'playerId' | 'userId'
> & {
  playerId: IPlayerComboOptions | null
  userId: IUsersComboOptions | null
}

export type UserPlayerAceSortBy =
  Paths.UserPlayerAclControllerFindAll.Parameters.SortBy

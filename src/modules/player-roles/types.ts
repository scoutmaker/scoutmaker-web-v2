import { IComboOptions } from '@/components/combo/types'

import { IPlayerPositionTypeComboOptions } from '../player-position-types/types'

export type PlayerRoleDto = Components.Schemas.PlayerRoleDto
export type PlayerRoleBasicDto = Components.Schemas.PlayerRoleBasicDataDto

export type CreatePlayerRoleDto = Components.Schemas.CreatePlayerRoleDto

export type UpdatePlayerRoleDto = Components.Schemas.UpdatePlayerRoleDto

export type FindAllPlayerRolesParams = Pick<
  Paths.PlayerRolesControllerFindAll.QueryParameters,
  | 'limit'
  | 'name'
  | 'page'
  | 'sortBy'
  | 'sortingOrder'
  | 'altName'
  | 'positionTypeIds'
>

export type PlayerRolesFiltersDto = Pick<
  FindAllPlayerRolesParams,
  'altName' | 'name' | 'positionTypeIds'
>

export type PlayerRolesFiltersState = Omit<
  PlayerRolesFiltersDto,
  'positionTypeIds'
> & {
  positionTypeIds: IPlayerPositionTypeComboOptions[]
}

export type PlayerRolesSortBy =
  Paths.PlayerRolesControllerFindAll.Parameters.SortBy

export interface IPlayerRolesComboOptions extends IComboOptions {
  name: string
  altName: string
}

import {
  createPlayerRole,
  deletePlayerRole,
  getPlayerRoles,
  getPlayerRolesList,
  updatePlayerRole,
} from '@/services/api/methods/player-roles'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreatePlayerRoleDto,
  FindAllPlayerRolesParams,
  PlayerRoleDto,
  UpdatePlayerRoleDto,
} from './types'

const moduleName: TModuleName = 'player-roles'

export const usePlayerRolesList = () =>
  useList<PlayerRoleDto>(moduleName, getPlayerRolesList)

export const usePlayerRoles = (params: FindAllPlayerRolesParams) =>
  usePaginatedData<FindAllPlayerRolesParams, PlayerRoleDto>(
    moduleName,
    params,
    getPlayerRoles,
  )

export const useUpdatePlayerRole = (id: string) =>
  useUpdateDocument<UpdatePlayerRoleDto, PlayerRoleDto>(
    moduleName,
    id,
    updatePlayerRole,
  )

export const useDeletePlayerRole = () =>
  useDeleteDocument<PlayerRoleDto>(moduleName, deletePlayerRole)

export const useCreatePlayerRole = () =>
  useCreateDocument<CreatePlayerRoleDto, PlayerRoleDto>(
    moduleName,
    createPlayerRole,
  )

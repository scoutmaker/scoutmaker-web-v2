import {
  createPlayerPositionType,
  deletePlayerPositionType,
  getPlayerPositionTypes,
  getPlayerPositionTypesList,
  updatePlayerPositionType,
} from '@/services/api/methods/player-position-types'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreatePlayerPostitionTypeDto,
  FindAllPlayerPositionsTypesParams,
  PlayerPositionTypeDto,
  UpdatePlayerPostitionTypeDto,
} from './types'

const moduleName: TModuleName = 'player-position-types'

export const usePlayerPositionTypesList = () =>
  useList<PlayerPositionTypeDto>(moduleName, getPlayerPositionTypesList)

export const usePlayerPositionTypes = (
  params: FindAllPlayerPositionsTypesParams,
) =>
  usePaginatedData<FindAllPlayerPositionsTypesParams, PlayerPositionTypeDto>(
    moduleName,
    params,
    getPlayerPositionTypes,
  )

export const useUpdatePlayerPositionType = (id: string) =>
  useUpdateDocument<UpdatePlayerPostitionTypeDto, PlayerPositionTypeDto>(
    moduleName,
    id,
    updatePlayerPositionType,
  )

export const useDeletePlayerPositionType = () =>
  useDeleteDocument<PlayerPositionTypeDto>(moduleName, deletePlayerPositionType)

export const useCreatePlayerPosition = () =>
  useCreateDocument<CreatePlayerPostitionTypeDto, PlayerPositionTypeDto>(
    moduleName,
    createPlayerPositionType,
  )

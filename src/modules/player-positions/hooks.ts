import {
  CreatePlayerPostitionDto,
  FindAllPlayerPositionsParams,
  PlayerPositionDto,
  UpdatePlayerPostitionDto,
} from '@/modules/player-positions/types'
import {
  createPlayerPosition,
  deletePlayerPosition,
  getPlayerPositions,
  getPlayerPositionsList,
  updatePlayerPosition,
} from '@/services/api/methods/player-positions'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'player-positions'

export const usePlayerPositionsList = () =>
  useList<PlayerPositionDto>(moduleName, getPlayerPositionsList)

export const usePlayerPositions = (params: FindAllPlayerPositionsParams) =>
  usePaginatedData<FindAllPlayerPositionsParams, PlayerPositionDto>(
    moduleName,
    params,
    getPlayerPositions,
  )

export const useUpdatePlayerPosition = (id: number) =>
  useUpdateDocument<UpdatePlayerPostitionDto, PlayerPositionDto>(
    moduleName,
    id,
    updatePlayerPosition,
  )

export const useDeletePlayerPosition = () =>
  useDeleteDocument<PlayerPositionDto>(moduleName, deletePlayerPosition)

export const useCreatePlayerPosition = () =>
  useCreateDocument<CreatePlayerPostitionDto, PlayerPositionDto>(
    moduleName,
    createPlayerPosition,
  )

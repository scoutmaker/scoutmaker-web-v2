import {
  createPlayerStats,
  deletePlayerStats,
  getPlayerStats,
  updatePlayerStats,
} from '@/services/api/methods/player-stats'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreatePlayerStatsDto,
  FindAllPlayerStatsParams,
  PlayerStatsDto,
  UpdatePlayerStatsDto,
} from './types'

const moduleName: TModuleName = 'player-stats'

export const usePlayerStats = (params: FindAllPlayerStatsParams) =>
  usePaginatedData<FindAllPlayerStatsParams, PlayerStatsDto>(
    moduleName,
    params,
    getPlayerStats,
  )

export const useDeletePlayerStats = () =>
  useDeleteDocument<PlayerStatsDto>(moduleName, deletePlayerStats)

export const useUpdatePlayerStats = (id: string) =>
  useUpdateDocument<UpdatePlayerStatsDto, PlayerStatsDto>(
    moduleName,
    id,
    updatePlayerStats,
  )

export const useCreatePlayerStats = () =>
  useCreateDocument<CreatePlayerStatsDto, PlayerStatsDto>(
    moduleName,
    createPlayerStats,
  )

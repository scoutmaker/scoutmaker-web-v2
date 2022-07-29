import { PlayerPositionDto } from '@/modules/player-positions/types'
import { getPlayerPositionsList } from '@/services/api/methods/player-positions'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'

const moduleName: TModuleName = 'player-positions'

export const usePlayerPositionsList = () =>
  useList<PlayerPositionDto>(moduleName, getPlayerPositionsList)

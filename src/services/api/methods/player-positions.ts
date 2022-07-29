import { PlayerPositionDto } from '@/modules/player-positions/types'
import { TModuleName } from '@/services/api/modules'

import { getDataList } from './helpers'

const moduleName: TModuleName = 'player-positions'

export const getPlayerPositionsList = () =>
  getDataList<PlayerPositionDto>(moduleName)

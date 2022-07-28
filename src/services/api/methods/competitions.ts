import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { TModuleName } from '@/services/api/modules'

import { getDataList } from './helpers'

const moduleName: TModuleName = 'competitions'

export const getCompetitionsList = () =>
  getDataList<CompetitionBasicDataDto>(moduleName)

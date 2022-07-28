import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { TModuleName } from '@/services/api/modules'

import { getDataList } from './helpers'

const moduleName: TModuleName = 'competition-groups'

export const getCompetitionGroupsList = () =>
  getDataList<CompetitionGroupBasicDataDto>(moduleName)

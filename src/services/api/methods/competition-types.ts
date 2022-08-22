import {
  CompetitionTypeDto,
  CompetitionTypesFindAllParams,
} from '@/modules/competition-types/types'

import { TModuleName } from '../modules'
import { getDataList, getPaginatedData } from './helpers'

const moduleName: TModuleName = 'competition-types'

export const getCompetitionTypes = (params: CompetitionTypesFindAllParams) =>
  getPaginatedData<CompetitionTypesFindAllParams, CompetitionTypeDto>(
    params,
    moduleName,
  )

export const getCompetitionTypesList = () =>
  getDataList<CompetitionTypeDto>(moduleName)

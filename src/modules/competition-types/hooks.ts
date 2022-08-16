import {
  getCompetitionTypes,
  getCompetitionTypesList,
} from '@/services/api/methods/competition-types'
import { TModuleName } from '@/services/api/modules'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'

import { CompetitionTypeDto, CompetitionTypesFindAllParams } from './types'

const moduleName: TModuleName = 'competition-types'

export const useCompetitionTypes = (params: CompetitionTypesFindAllParams) =>
  usePaginatedData<CompetitionTypesFindAllParams, CompetitionTypeDto>(
    moduleName,
    params,
    getCompetitionTypes,
  )

export const useCompetitionTypesList = () =>
  useList<CompetitionTypeDto>(moduleName, getCompetitionTypesList)

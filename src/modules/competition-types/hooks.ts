import { getCompetitionTypes } from '@/services/api/methods/competition-types'
import { TModuleName } from '@/services/api/modules'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'

import { CompetitionTypeDto, CompetitionTypesFindAllParams } from './types'

const moduleName: TModuleName = 'competition-types'

export const useCompetitionTypes = (params: CompetitionTypesFindAllParams) =>
  usePaginatedData<CompetitionTypesFindAllParams, CompetitionTypeDto>(
    moduleName,
    params,
    getCompetitionTypes,
  )

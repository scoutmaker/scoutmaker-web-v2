import {
  FindAllTeamAffiliationsParams,
  TeamAffiliationDto,
} from '@/modules/team-affiliations/types'
import { TModuleName } from '@/services/api/modules'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'

import { getTeamAffiliations } from '../../services/api/methods/team-affiliations'

const moduleName: TModuleName = 'team-affiliations'

export const useTeamAffiliations = (params: FindAllTeamAffiliationsParams) =>
  usePaginatedData<FindAllTeamAffiliationsParams, TeamAffiliationDto>(
    moduleName,
    params,
    getTeamAffiliations,
  )

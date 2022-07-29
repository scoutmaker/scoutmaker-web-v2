import {
  FindAllTeamAffiliationsParams,
  TeamAffiliationDto,
} from '@/modules/team-affiliations/types'
import { getPaginatedData } from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'team-affiliations'

export const getTeamAffiliations = (params: FindAllTeamAffiliationsParams) =>
  getPaginatedData<FindAllTeamAffiliationsParams, TeamAffiliationDto>(
    params,
    moduleName,
  )

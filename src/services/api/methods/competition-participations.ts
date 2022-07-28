import {
  CompetitionParticipationDto,
  FindAllCompetitionParticipationsParams,
} from '@/modules/competition-participations/types'
import { TModuleName } from '@/services/api/modules'

import { getPaginatedData } from './helpers'

const moduleName: TModuleName = 'competition-participations'

export const getCompetitionParticipations = (
  params: FindAllCompetitionParticipationsParams,
) =>
  getPaginatedData<
    FindAllCompetitionParticipationsParams,
    CompetitionParticipationDto
  >(params, moduleName)

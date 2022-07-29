import {
  CompetitionParticipationDto,
  FindAllCompetitionParticipationsParams,
} from '@/modules/competition-participations/types'
import { getCompetitionParticipations } from '@/services/api/methods/competition-participations'
import { TModuleName } from '@/services/api/modules'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'

const moduleName: TModuleName = 'competition-participations'

export const useCompetitionParticipations = (
  params: FindAllCompetitionParticipationsParams,
) =>
  usePaginatedData<
    FindAllCompetitionParticipationsParams,
    CompetitionParticipationDto
  >(moduleName, params, getCompetitionParticipations)

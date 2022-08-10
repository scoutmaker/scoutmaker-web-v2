import { getCompetitionJuniorLevels } from "@/services/api/methods/competition-junior-levels";
import { TModuleName } from '@/services/api/modules'
import { usePaginatedData } from "@/utils/hooks/api/use-paginated-data";

import { CompetitionJuniorLevelDto, FindAllCompetitionJuniorLevelsParams } from "./types";

const moduleName: TModuleName = 'competition-junior-levels'

export const useCompetitionJuniorLevels = (params: FindAllCompetitionJuniorLevelsParams) =>
  usePaginatedData<FindAllCompetitionJuniorLevelsParams, CompetitionJuniorLevelDto>(moduleName, params, getCompetitionJuniorLevels)
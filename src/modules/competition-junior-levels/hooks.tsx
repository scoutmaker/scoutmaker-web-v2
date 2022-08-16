import { getCompetitionJuniorLevels, getCompetitionJuniorLevelsList } from "@/services/api/methods/competition-junior-levels";
import { TModuleName } from '@/services/api/modules'
import { useList } from "@/utils/hooks/api/use-list";
import { usePaginatedData } from "@/utils/hooks/api/use-paginated-data";

import { CompetitionJuniorLevelDto, FindAllCompetitionJuniorLevelsParams } from "./types";

const moduleName: TModuleName = 'competition-junior-levels'

export const useCompetitionJuniorLevels = (params: FindAllCompetitionJuniorLevelsParams) =>
  usePaginatedData<FindAllCompetitionJuniorLevelsParams, CompetitionJuniorLevelDto>(moduleName, params, getCompetitionJuniorLevels)

export const useCompetitionJuniorLevelsList = () => useList<CompetitionJuniorLevelDto>(moduleName, getCompetitionJuniorLevelsList)
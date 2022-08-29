import { createCompetitionJuniorLevel, deleteCompetitionJuniorLevel, getCompetitionJuniorLevels, getCompetitionJuniorLevelsList, updateCompetitionJuniorLevel } from "@/services/api/methods/competition-junior-levels";
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from "@/utils/hooks/api/use-create-document";
import { useDeleteDocument } from "@/utils/hooks/api/use-delete-document";
import { useList } from "@/utils/hooks/api/use-list";
import { usePaginatedData } from "@/utils/hooks/api/use-paginated-data";
import { useUpdateDocument } from "@/utils/hooks/api/use-update-document";

import { CompetitionJuniorLevelDto, CreateCompetitionJuniorLevelDto, FindAllCompetitionJuniorLevelsParams, UpdateCompetitionJuniorLevelDto } from "./types";

const moduleName: TModuleName = 'competition-junior-levels'

export const useCompetitionJuniorLevels = (params: FindAllCompetitionJuniorLevelsParams) =>
  usePaginatedData<FindAllCompetitionJuniorLevelsParams, CompetitionJuniorLevelDto>(moduleName, params, getCompetitionJuniorLevels)

export const useCompetitionJuniorLevelsList = () => useList<CompetitionJuniorLevelDto>(moduleName, getCompetitionJuniorLevelsList)

export const useCreateCompetitionJuniorLevel = () =>
  useCreateDocument<CreateCompetitionJuniorLevelDto, CompetitionJuniorLevelDto>(moduleName, createCompetitionJuniorLevel)

export const useUpdateCompetitionJuniorLevel = (id: number) =>
  useUpdateDocument<UpdateCompetitionJuniorLevelDto, CompetitionJuniorLevelDto>(moduleName, id, updateCompetitionJuniorLevel)

export const useDeleteCompetitionJuniorLevel = () =>
  useDeleteDocument<CompetitionJuniorLevelDto>(moduleName, deleteCompetitionJuniorLevel)
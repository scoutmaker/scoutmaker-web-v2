import { CompetitionBasicDataDto, CompetitionDto, CreateCompetitonDto, FindAllCompetitionsParams, UpdateCompetitionDto } from '@/modules/competitions/types'
import { createCompetition, deleteCompetition, getCompetitions, getCompetitionsList, updateCompetition } from '@/services/api/methods/competitions'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'competitions'

export const useCompetitionsList = () =>
  useList<CompetitionBasicDataDto>(moduleName, getCompetitionsList)

export const useCompetitions = (params: FindAllCompetitionsParams) =>
  usePaginatedData<FindAllCompetitionsParams, CompetitionDto>(moduleName, params, getCompetitions)

export const useCreateCompetition = () =>
  useCreateDocument<CreateCompetitonDto, CompetitionDto>(moduleName, createCompetition)

export const useUpdateCompetition = (id: number) =>
  useUpdateDocument<UpdateCompetitionDto, CompetitionDto>(moduleName, id, updateCompetition)

export const useDeleteCompetition = () =>
  useDeleteDocument<CompetitionDto>(moduleName, deleteCompetition)

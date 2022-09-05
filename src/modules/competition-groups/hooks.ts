import {
  CompetitionGroupBasicDataDto,
  CompetitionGroupDto,
  CreateCompetitionGroupDto,
  FindAllCompetitionGroupsParams,
  UpdateCompetitionGroupDto,
} from '@/modules/competition-groups/types'
import {
  createCompetitionGroup,
  deleteCompetitionGroup,
  getCompetitionGroups,
  getCompetitionGroupsList,
  updateCompetitionGroup,
} from '@/services/api/methods/competition-groups'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

const moduleName: TModuleName = 'competition-groups'

export const useCompetitionGroupsList = () =>
  useList<CompetitionGroupBasicDataDto>(moduleName, getCompetitionGroupsList)

export const useCompetitionGroups = (params: FindAllCompetitionGroupsParams) =>
  usePaginatedData<FindAllCompetitionGroupsParams, CompetitionGroupDto>(
    moduleName,
    params,
    getCompetitionGroups,
  )

export const useCreateCompetitionGroup = () =>
  useCreateDocument<CreateCompetitionGroupDto, CompetitionGroupDto>(
    moduleName,
    createCompetitionGroup,
  )

export const useUpdateCompetitionGroup = (id: number) =>
  useUpdateDocument<UpdateCompetitionGroupDto, CompetitionGroupDto>(
    moduleName,
    id,
    updateCompetitionGroup,
  )

export const useDeleteCompetitionGroup = () =>
  useDeleteDocument<CompetitionGroupDto>(moduleName, deleteCompetitionGroup)

import {
  createCompetitionType,
  deleteCompetitionType,
  getCompetitionTypes,
  getCompetitionTypesList,
  updateCompetitionType,
} from '@/services/api/methods/competition-types'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CompetitionTypeDto,
  CompetitionTypesFindAllParams,
  CreateCompetitionTypeDto,
  UpdateCompetitionTypeDto,
} from './types'

const moduleName: TModuleName = 'competition-types'

export const useCompetitionTypes = (params: CompetitionTypesFindAllParams) =>
  usePaginatedData<CompetitionTypesFindAllParams, CompetitionTypeDto>(
    moduleName,
    params,
    getCompetitionTypes,
  )

export const useCompetitionTypesList = () =>
  useList<CompetitionTypeDto>(moduleName, getCompetitionTypesList)

export const useCreateCompetitionType = () =>
  useCreateDocument<CreateCompetitionTypeDto, CompetitionTypeDto>(
    moduleName,
    createCompetitionType,
  )

export const useUpdateCompetitionType = (id: number) =>
  useUpdateDocument<UpdateCompetitionTypeDto, CompetitionTypeDto>(
    moduleName,
    id,
    updateCompetitionType,
  )

export const useDeleteCompetitionType = () =>
  useDeleteDocument<CompetitionTypeDto>(moduleName, deleteCompetitionType)

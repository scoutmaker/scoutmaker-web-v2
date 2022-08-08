import {
  createCompetitionAgeCategory,
  deleteCompetitionAgeCategory,
  getCompetitionAgeCategories,
  updateCompetitionAgeCategory,
} from '@/services/api/methods/competition-age-categories'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CompetitionAgeCategortyDto,
  CreateCompetitionAgeCategoryDto,
  FindAllCompetitionAgeCategoriesParams,
  UpdateCompetitionAgeCategoryDto,
} from './types'

const moduleName: TModuleName = 'competition-age-categories'

export const useCompetitionAgeCategories = (
  params: FindAllCompetitionAgeCategoriesParams,
) =>
  usePaginatedData<
    FindAllCompetitionAgeCategoriesParams,
    CompetitionAgeCategortyDto
  >(moduleName, params, getCompetitionAgeCategories)

export const useDeleteCompetitionAgeCategory = () =>
  useDeleteDocument<CompetitionAgeCategortyDto>(
    moduleName,
    deleteCompetitionAgeCategory,
  )

export const useCreateCompetitionAgeCategory = () =>
  useCreateDocument<
    CreateCompetitionAgeCategoryDto,
    CompetitionAgeCategortyDto
  >(moduleName, createCompetitionAgeCategory)

export const useUpdateCompetitionAgeCategory = (id: number) =>
  useUpdateDocument<
    UpdateCompetitionAgeCategoryDto,
    CompetitionAgeCategortyDto
  >(moduleName, id, updateCompetitionAgeCategory)

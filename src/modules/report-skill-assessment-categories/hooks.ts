import {
  createReportSkillAssessmentCategory,
  deleteReportSkillAssessmentCategory,
  getReportSkillAssessmentCategories,
  getReportSkillAssessmentCategoriesList,
  updateReportSkillAssessmentCategory,
} from '@/services/api/methods/report-skill-assessment-categories'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateReportSkillAssessmentCategoryDto,
  FindAllReportSkillAssessmentCategoriesParams,
  ReportSkillAssessmentCategoryDto,
  UpdateReportSkillAssessmentCategoryDto,
} from './types'

const moduleName: TModuleName = 'report-skill-assessment-categories'

export const useReportSkillAssessmentCategoriesList = () =>
  useList<ReportSkillAssessmentCategoryDto>(
    moduleName,
    getReportSkillAssessmentCategoriesList,
  )

export const useReportSkillAssessmentCategories = (
  params: FindAllReportSkillAssessmentCategoriesParams,
) =>
  usePaginatedData<
    FindAllReportSkillAssessmentCategoriesParams,
    ReportSkillAssessmentCategoryDto
  >(moduleName, params, getReportSkillAssessmentCategories)

export const useCreateReportSkillAssessmentCategory = () =>
  useCreateDocument<
    CreateReportSkillAssessmentCategoryDto,
    ReportSkillAssessmentCategoryDto
  >(moduleName, createReportSkillAssessmentCategory)

export const useUpdateReportSkillAssessmentCategory = (id: number) =>
  useUpdateDocument<
    UpdateReportSkillAssessmentCategoryDto,
    ReportSkillAssessmentCategoryDto
  >(moduleName, id, updateReportSkillAssessmentCategory)

export const useDeleteReportSkillAssessmentCategory = () =>
  useDeleteDocument<ReportSkillAssessmentCategoryDto>(
    moduleName,
    deleteReportSkillAssessmentCategory,
  )

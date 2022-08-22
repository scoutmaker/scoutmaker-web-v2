import {
  CreateReportSkillAssessmentCategoryDto,
  FindAllReportSkillAssessmentCategoriesParams,
  ReportSkillAssessmentCategoryDto,
  UpdateReportSkillAssessmentCategoryDto,
} from '@/modules/report-skill-assessment-categories/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'report-skill-assessment-categories'

export const getReportSkillAssessmentCategoriesList = () =>
  getDataList<ReportSkillAssessmentCategoryDto>(moduleName)

export const getReportSkillAssessmentCategories = (
  params: FindAllReportSkillAssessmentCategoriesParams,
) =>
  getPaginatedData<
    FindAllReportSkillAssessmentCategoriesParams,
    ReportSkillAssessmentCategoryDto
  >(params, moduleName)

export const createReportSkillAssessmentCategory = (
  data: CreateReportSkillAssessmentCategoryDto,
) =>
  createDocument<
    CreateReportSkillAssessmentCategoryDto,
    ReportSkillAssessmentCategoryDto
  >(data, moduleName)

interface IUpdateReportSkillAssessmentCategoryArgs {
  id: number
  data: UpdateReportSkillAssessmentCategoryDto
}
export const updateReportSkillAssessmentCategory = ({
  id,
  data,
}: IUpdateReportSkillAssessmentCategoryArgs) =>
  updateDocument<
    UpdateReportSkillAssessmentCategoryDto,
    ReportSkillAssessmentCategoryDto
  >(id, data, moduleName)

export const getReportSkillAssessmentCategoryById = (
  id: number,
  token?: string,
) => getAssetById<ReportSkillAssessmentCategoryDto>({ moduleName, id, token })

export const deleteReportSkillAssessmentCategory = (id: number) =>
  deleteDocument<ReportSkillAssessmentCategoryDto>(id, moduleName)

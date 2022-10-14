import { IComboOptions } from '@/components/combo/types'

import { ReportSkillAssessmentCategoryDto } from '../report-skill-assessment-categories/types'

export type ReportSkillAssessmentTemplateDto =
  Components.Schemas.ReportSkillAssessmentTemplateDto

export type CreateReportSkillAssessmentTemplateDto =
  Components.Schemas.CreateReportSkillAssessmentTemplateDto

export type UpdateReportSkillAssessmentTemplateDto =
  Components.Schemas.UpdateReportSkillAssessmentTemplateDto

export type FindAllReportSkillAssessmentTemplatesParams = Pick<
  Paths.ReportSkillAssessmentTemplatesControllerFindAll.QueryParameters,
  'categoryIds' | 'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type ReportSkillAssessmentTemplatesFiltersDto = Pick<
  FindAllReportSkillAssessmentTemplatesParams,
  'categoryIds' | 'name'
>

export type ReportSkillAssessmentTemplatesFiltersState = Omit<
  ReportSkillAssessmentTemplatesFiltersDto,
  'categoryIds'
> & {
  categoryIds: IComboOptions[]
}

export type ReportSkillAssessmentTemplatesSortBy =
  Paths.ReportSkillAssessmentTemplatesControllerFindAll.Parameters.SortBy

export interface IReportSkillAssessmentTemplateComboOptions
  extends IComboOptions {
  name: string
  category: ReportSkillAssessmentCategoryDto
}

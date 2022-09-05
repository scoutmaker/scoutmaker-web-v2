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

export type ReportSkillAssessmentTemplatesSortBy =
  Paths.ReportSkillAssessmentTemplatesControllerFindAll.Parameters.SortBy

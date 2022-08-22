export type ReportSkillAssessmentCategoryDto =
  Components.Schemas.ReportSkillAssessmentCategoryDto

export type ReportSkillAssessmentCategoriesFiltersDto = Pick<
  Paths.ReportSkillAssessmentCategoriesControllerFindAll.QueryParameters,
  'name'
>

export type CreateReportSkillAssessmentCategoryDto =
  Components.Schemas.CreateReportSkillAssessmentCategoryDto
export type UpdateReportSkillAssessmentCategoryDto =
  Components.Schemas.UpdateReportSkillAssessmentCategoryDto

export type ReportSkillAssessmentCategoriesSortBy =
  Paths.ReportSkillAssessmentCategoriesControllerFindAll.Parameters.SortBy

export type FindAllReportSkillAssessmentCategoriesParams = Pick<
  Paths.ReportSkillAssessmentCategoriesControllerFindAll.QueryParameters,
  'name' | 'limit' | 'page' | 'sortBy' | 'sortingOrder'
>

export type ReportTemplateBasicDataDto =
  Components.Schemas.ReportTemplateBasicDataDto

export type ReportTemplateDto = Components.Schemas.ReportTemplateDto

export type CreateReportTemplateDto = Components.Schemas.CreateReportTemplateDto

export type UpdateReportTemplateDto = Components.Schemas.UpdateReportTemplateDto

export type FindAllReportTemplatesParams = Pick<
  Paths.ReportTemplatesControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type ReportTemplatesFiltersDto = Pick<
  FindAllReportTemplatesParams,
  'name'
>

export type ReportTemplatesSortBy =
  Paths.ReportTemplatesControllerFindAll.Parameters.SortBy

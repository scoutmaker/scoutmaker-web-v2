export type ReportBgImageDto = Components.Schemas.ReportBackgroundImageDto

export type CreateReportBgImageDto =
  Components.Schemas.CreateReportBackgroundImageDto

export type UpdateReportBgImageDto =
  Components.Schemas.UpdateReportBackgroundImageDto

export type FindAllReportBgImagesParams = Pick<
  Paths.ReportBackgroundImagesControllerFindAll.QueryParameters,
  'limit' | 'name' | 'page' | 'sortBy' | 'sortingOrder'
>

export type ReportBgImagesFiltersDto = Pick<FindAllReportBgImagesParams, 'name'>

export type ReportBgImagesSortBy =
  Paths.ReportBackgroundImagesControllerFindAll.Parameters.SortBy

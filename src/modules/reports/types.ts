export type ReportBasicDataDto = Components.Schemas.ReportBasicDataDto

export type FindAllReportsParams = Pick<
  Paths.ReportsControllerFindAll.QueryParameters,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'isLiked'
  | 'limit'
  | 'matchIds'
  | 'page'
  | 'percentageRatingRangeEnd'
  | 'percentageRatingRangeStart'
  | 'playerBornAfter'
  | 'playerBornBefore'
  | 'playerIds'
  | 'positionIds'
  | 'sortBy'
  | 'sortingOrder'
  | 'teamIds'
  | 'hasVideo'
>

export type ReportsFiltersDto = Omit<
  FindAllReportsParams,
  'limit' | 'page' | 'sortBy' | 'sortingOrder'
>

export type ReportsSortBy = Paths.ReportsControllerFindAll.Parameters.SortBy

export type ReportDto = Components.Schemas.ReportDto

export type CreateReportDto = Components.Schemas.CreateReportDto

export type UpdateReportDto = Components.Schemas.UpdateReportDto

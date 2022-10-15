import { IComboOptions } from '@/components/combo/types'
import { RatingRange } from '@/types/rating-range'

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
  | 'userId'
>

export type ReportsFiltersDto = Omit<
  FindAllReportsParams,
  'limit' | 'page' | 'sortBy' | 'sortingOrder'
>

export type ReportsFilterFormData = Omit<
  ReportsFiltersDto,
  'percentageRatingRangeStart' | 'percentageRatingRangeEnd'
> & { ratingRange: RatingRange }

export type ReportsFiltersState = Omit<
  ReportsFilterFormData,
  | 'competitionGroupIds'
  | 'competitionIds'
  | 'matchIds'
  | 'playerIds'
  | 'positionIds'
  | 'teamIds'
> & {
  competitionGroupIds: IComboOptions[]
  competitionIds: IComboOptions[]
  matchIds: IComboOptions[]
  playerIds: IComboOptions[]
  positionIds: IComboOptions[]
  teamIds: IComboOptions[]
}

export type ReportsSortBy = Paths.ReportsControllerFindAll.Parameters.SortBy

export type ReportDto = Components.Schemas.ReportDto

export type ReportPaginatedDataDto = Components.Schemas.ReportPaginatedDataDto

export type CreateReportDto = Components.Schemas.CreateReportDto

export type UpdateReportDto = Components.Schemas.UpdateReportDto

export type ReportStatus = ReportDto['status']

export type ReportType = 'order' | 'custom'

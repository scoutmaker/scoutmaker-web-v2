import {
  RATING_RANGE_END_MAP,
  RATING_RANGE_START_MAP,
} from '@/utils/rating-range-maps'
import { Routes } from '@/utils/routes'

import { ReportsFilterFormData, ReportsFiltersDto } from './types'

export function getSingleReportRoute(id: string) {
  return `${Routes.REPORTS}/${id}`
}

export function mapFilterFormDataToFiltersDto(
  data: ReportsFilterFormData,
): ReportsFiltersDto {
  const { ratingRange, ...rest } = data

  return {
    ...rest,
    percentageRatingRangeStart: RATING_RANGE_START_MAP[ratingRange],
    percentageRatingRangeEnd: RATING_RANGE_END_MAP[ratingRange],
  }
}

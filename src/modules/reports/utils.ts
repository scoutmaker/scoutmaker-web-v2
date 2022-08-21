import { Routes } from '@/utils/routes'

import { RatingRange, ReportsFilterFormData, ReportsFiltersDto } from './types'

export function getSingleReportRoute(id: number) {
  return `${Routes.REPORTS}/${id}`
}

const RATING_RANGE_START_MAP: Record<RatingRange, number | undefined> = {
  ALL: undefined,
  NEGATIVE_SELECTION: 0,
  NO_DECISION: 26,
  TO_OBSERVE: 51,
  POSITIVE_SELECTION: 76,
}

const RATING_RANGE_END_MAP: Record<RatingRange, number | undefined> = {
  ALL: undefined,
  NEGATIVE_SELECTION: 25,
  NO_DECISION: 50,
  TO_OBSERVE: 75,
  POSITIVE_SELECTION: 100,
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

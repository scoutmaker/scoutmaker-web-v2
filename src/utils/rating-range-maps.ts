import { RatingRange } from '@/types/rating-range'

export const RATING_RANGE_START_MAP: Record<RatingRange, number | undefined> = {
  ALL: undefined,
  NEGATIVE_SELECTION: 0,
  NO_DECISION: 26,
  TO_OBSERVE: 51,
  POSITIVE_SELECTION: 76,
}

export const RATING_RANGE_END_MAP: Record<RatingRange, number | undefined> = {
  ALL: undefined,
  NEGATIVE_SELECTION: 25,
  NO_DECISION: 50,
  TO_OBSERVE: 75,
  POSITIVE_SELECTION: 100,
}

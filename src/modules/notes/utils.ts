import { TFiltersStateData } from '@/components/combo/utils'
import { NotesFiltersState } from '@/modules/notes/types'
import {
  RATING_RANGE_END_MAP,
  RATING_RANGE_START_MAP,
} from '@/utils/rating-range-maps'

export function mapFilterFormDataToFiltersDto(
  data: NotesFiltersState,
): TFiltersStateData {
  const { ratingRange, ...rest } = data

  return {
    ...rest,
    percentageRatingRangeStart: RATING_RANGE_START_MAP[ratingRange],
    percentageRatingRangeEnd: RATING_RANGE_END_MAP[ratingRange],
  }
}

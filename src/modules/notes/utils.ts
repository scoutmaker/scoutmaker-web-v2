import {
  INotesComboOptions,
  NoteBasicDataDto,
  NotesFilterFormData,
  NotesFiltersDto,
} from '@/modules/notes/types'
import { getDocumentNumber } from '@/utils/get-document-number'
import {
  RATING_RANGE_END_MAP,
  RATING_RANGE_START_MAP,
} from '@/utils/rating-range-maps'

import { getPlayerFullName } from '../players/utils'

export function mapFilterFormDataToFiltersDto(
  data: NotesFilterFormData,
): NotesFiltersDto {
  const { ratingRange, ...rest } = data

  return {
    ...rest,
    percentageRatingRangeStart: RATING_RANGE_START_MAP[ratingRange],
    percentageRatingRangeEnd: RATING_RANGE_END_MAP[ratingRange],
  }
}

export function mapNotesListToComboOptions(
  data: NoteBasicDataDto[],
): INotesComboOptions[] {
  return data.map(
    ({ id, createdAt, docNumber, description, player, rating, shirtNo }) => ({
      id,
      label: `${player ? getPlayerFullName(player) : ''} (${getDocumentNumber({
        docNumber,
        createdAt,
      })})`,
      description,
      player,
      rating,
      shirtNo,
    }),
  )
}

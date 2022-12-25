import { INotesComboOptions, NoteBasicDataDto } from '@/modules/notes/types'
import { getDocumentNumber } from '@/utils/get-document-number'

import { getPlayerFullName } from '../players/utils'

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

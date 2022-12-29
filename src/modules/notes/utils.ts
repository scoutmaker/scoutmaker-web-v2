import {
  INotesComboOptions,
  NoteBasicDataDto,
  NoteDto,
} from '@/modules/notes/types'
import { getDocumentNumber } from '@/utils/get-document-number'

import { useLikePlayer } from '../players/hooks'
import { getPlayerFullName } from '../players/utils'
import { useLikeNote } from './hooks'

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

export const useOnLikeNoteClick = () => {
  const { mutate: likeNote, isLoading: likeNoteLoading } = useLikeNote()
  const { mutate: likePlayer, isLoading: likePlayerLoading } = useLikePlayer()

  const onLikeClick = (note: NoteDto) => {
    likeNote(note.id)
    if (note?.player) likePlayer(note.player.id)
  }

  return {
    likeNote: onLikeClick,
    likeNoteLoading: likePlayerLoading || likeNoteLoading,
  }
}

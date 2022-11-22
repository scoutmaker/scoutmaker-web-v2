import { getPlayerFullName } from '../players/utils'
import { IInsiderNoteComboOptions, InsiderNoteBasicDataDto } from './types'

export function mapInsiderNotesListToComboOptions(
  data: InsiderNoteBasicDataDto[],
): IInsiderNoteComboOptions[] {
  return data.map(({ id, author, docNumber, player }) => ({
    id,
    label: `${author.firstName} ${author.lastName} (${getPlayerFullName(
      player,
    )}/${docNumber})`,
    author,
    docNumber,
    player,
  }))
}

import {
  createNote,
  deleteNote,
  getNotes,
  getNotesList,
  likeNote,
  unlikeNote,
  updateNote,
} from '@/services/api/methods/notes'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useLikeDocument } from '@/utils/hooks/api/use-like-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useUnlikeDocument } from '@/utils/hooks/api/use-unlike-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateNoteDto,
  FindAllNotesParams,
  NoteBasicDataDto,
  NoteDto,
  NotesListParams,
  UpdateNoteDto,
} from './types'

const moduleName: TModuleName = 'notes'

export const useNotesList = (params?: NotesListParams, enabled?: boolean) =>
  useList<NoteBasicDataDto>(moduleName, getNotesList, params, enabled)

export const useNotes = (params: FindAllNotesParams) =>
  usePaginatedData<FindAllNotesParams, NoteDto>(moduleName, params, getNotes)

export const useCreateNote = () =>
  useCreateDocument<CreateNoteDto, NoteDto>(moduleName, createNote)

export const useUpdateNote = (id: string) =>
  useUpdateDocument<UpdateNoteDto, NoteDto>(moduleName, id, updateNote)

export const useDeleteNote = () =>
  useDeleteDocument<NoteDto>(moduleName, deleteNote)

export const useLikeNote = () => useLikeDocument<NoteDto>(moduleName, likeNote)

export const useUnlikeNote = () =>
  useUnlikeDocument<NoteDto>(moduleName, unlikeNote)

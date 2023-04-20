import {
  CreateNoteDto,
  FindAllNotesParams,
  NoteBasicDataDto,
  NoteDto,
  NotesListParams,
  UpdateNoteDto,
} from '@/modules/notes/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  likeDocument,
  unlikeDocument,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'notes'

export const getNoteById = (id: string, token?: string) =>
  getAssetById<NoteDto>({ moduleName, id, token })

export const getNotesList = (params?: NotesListParams) =>
  getDataList<NoteBasicDataDto>(moduleName, params)

export const getNotes = (params: FindAllNotesParams) =>
  getPaginatedData<FindAllNotesParams, NoteDto>(params, moduleName)

export const createNote = (data: CreateNoteDto) =>
  createDocument<CreateNoteDto, NoteDto>(data, moduleName)

interface IUpdateNoteArgs {
  id: string
  data: UpdateNoteDto
}

export const updateNote = ({ id, data }: IUpdateNoteArgs) =>
  updateDocument<UpdateNoteDto, NoteDto>(id, data, moduleName)

export const deleteNote = (id: string) =>
  deleteDocument<NoteDto>(id, moduleName)

export const likeNote = (id: string) => likeDocument<NoteDto>(id, moduleName)

export const unlikeNote = (id: string) =>
  unlikeDocument<NoteDto>(id, moduleName)

import {
  CreateNoteDto,
  FindAllNotesParams,
  NoteBasicDataDto,
  NoteDto,
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

export const getNoteById = (id: number, token?: string) =>
  getAssetById<NoteDto>({ moduleName, id, token })

export const getNotesList = () => getDataList<NoteBasicDataDto>(moduleName)

export const getNotes = (params: FindAllNotesParams) =>
  getPaginatedData<FindAllNotesParams, NoteDto>(params, moduleName)

export const createNote = (data: CreateNoteDto) =>
  createDocument<CreateNoteDto, NoteDto>(data, moduleName)

interface IUpdateNoteArgs {
  id: number
  data: UpdateNoteDto
}

export const updateNote = ({ id, data }: IUpdateNoteArgs) =>
  updateDocument<UpdateNoteDto, NoteDto>(id, data, moduleName)

export const deleteNote = (id: number) =>
  deleteDocument<NoteDto>(id, moduleName)

export const likeNote = (id: number) => likeDocument<NoteDto>(id, moduleName)

export const unlikeNote = (id: number) =>
  unlikeDocument<NoteDto>(id, moduleName)

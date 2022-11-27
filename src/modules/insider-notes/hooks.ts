import {
  createInsiderNote,
  deleteInsiderNote,
  getInsiderNotes,
  getInsiderNotesList,
  likeInsiderNote,
  unLikeInsiderNote,
  updateInsiderNote,
} from '@/services/api/methods/insider-notes'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'
import { useDeleteDocument } from '@/utils/hooks/api/use-delete-document'
import { useList } from '@/utils/hooks/api/use-list'
import { usePaginatedData } from '@/utils/hooks/api/use-paginated-data'
import { useToggleActiveDocument } from '@/utils/hooks/api/use-toggle-active-document'
import { useUpdateDocument } from '@/utils/hooks/api/use-update-document'

import {
  CreateInsiderNoteDto,
  FindAllInsiderNotesParams,
  InsiderNoteDto,
  UpdateInsiderNoteDto,
} from './types'

const moduleName: TModuleName = 'insider-notes'

export const useInsiderNotesList = () =>
  useList<InsiderNoteDto>(moduleName, getInsiderNotesList)

export const useInsiderNotes = (params: FindAllInsiderNotesParams) =>
  usePaginatedData<FindAllInsiderNotesParams, InsiderNoteDto>(
    moduleName,
    params,
    getInsiderNotes,
  )

export const useUpdateInsiderNote = (id: string) =>
  useUpdateDocument<UpdateInsiderNoteDto, InsiderNoteDto>(
    moduleName,
    id,
    updateInsiderNote,
  )

export const useDeleteInsiderNote = () =>
  useDeleteDocument<InsiderNoteDto>(moduleName, deleteInsiderNote)

export const useCreateInsiderNote = () =>
  useCreateDocument<CreateInsiderNoteDto, InsiderNoteDto>(
    moduleName,
    createInsiderNote,
  )

export const useLikeInsiderNote = () =>
  useToggleActiveDocument<InsiderNoteDto>(moduleName, likeInsiderNote)

export const useUnLikeInsiderNote = () =>
  useToggleActiveDocument<InsiderNoteDto>(moduleName, unLikeInsiderNote)

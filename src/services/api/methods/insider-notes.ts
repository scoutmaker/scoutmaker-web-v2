import {
  CreateInsiderNoteDto,
  FindAllInsiderNotesParams,
  InsiderNoteDto,
  UpdateInsiderNoteDto,
} from '@/modules/insider-notes/types'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'
import { ApiResponse } from '../types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'insider-notes'

export const getInsiderNotesList = () => getDataList<InsiderNoteDto>(moduleName)

export const getInsiderNotes = (params: FindAllInsiderNotesParams) =>
  getPaginatedData<FindAllInsiderNotesParams, InsiderNoteDto>(
    params,
    moduleName,
  )

export const createInsiderNote = (data: CreateInsiderNoteDto) =>
  createDocument<CreateInsiderNoteDto, InsiderNoteDto>(data, moduleName)

interface IUpdateArgs {
  id: number
  data: UpdateInsiderNoteDto
}
export const updateInsiderNote = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateInsiderNoteDto, InsiderNoteDto>(id, data, moduleName)

export const getInsiderNoteById = (id: number, token?: string) =>
  getAssetById<InsiderNoteDto>({ moduleName, id, token })

export const deleteInsiderNote = (id: number) =>
  deleteDocument<InsiderNoteDto>(id, moduleName)

export const likeInsiderNote = (id: number) => likeDocument<InsiderNoteDto>(id)

export const unLikeInsiderNote = (id: number) =>
  unLikeDocument<InsiderNoteDto>(id)

async function likeDocument<ReturnType>(
  id: number,
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.post<ApiResponse<ReturnType>>(
    `/like-insider-notes/${id}`,
  )
  return data
}
async function unLikeDocument<ReturnType>(
  id: number,
): Promise<ApiResponse<ReturnType>> {
  const { data } = await client.delete<ApiResponse<ReturnType>>(
    `/like-insider-notes/${id}`,
  )
  return data
}

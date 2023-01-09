import {
  CreateScouProfileDto,
  ScoutProfileDto,
  UpdateScouProfileDto,
} from '@/modules/scout-profile/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'scout-profiles'

export const getScoutProfileById = (id: string, token?: string) =>
  getAssetById<ScoutProfileDto>({ moduleName, id, token })

export const deleteScoutProfile = (id: string) =>
  deleteDocument<ScoutProfileDto>(id, moduleName)

interface IUpdateArgs {
  id: string
  data: UpdateScouProfileDto
}
export const updateScoutProfile = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateScouProfileDto, ScoutProfileDto>(id, data, moduleName)

export const createScoutProfile = (data: CreateScouProfileDto) =>
  createDocument<CreateScouProfileDto, ScoutProfileDto>(data, moduleName)

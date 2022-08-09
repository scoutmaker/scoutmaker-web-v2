import {
  CreateSeasonDto,
  SeasonDto,
  UpdateSeasonDto,
} from '@/modules/seasons/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  setActiveDocument,
  unSetActiveDocument,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'seasons'

export const getSeasonsList = () => getDataList<SeasonDto>(moduleName)

export const deleteSeason = (id: number) =>
  deleteDocument<SeasonDto>(id, moduleName)

interface IUpdateArgs {
  id: number
  data: UpdateSeasonDto
}
export const updateSeason = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateSeasonDto, SeasonDto>(id, data, moduleName)

export const createSeason = (data: CreateSeasonDto) =>
  createDocument<CreateSeasonDto, SeasonDto>(data, moduleName)

export const getSeasonById = (id: number, token?: string) =>
  getAssetById<SeasonDto>({ moduleName, id, token })

export const setActiveSeason = (id: number) =>
  setActiveDocument<SeasonDto>(id, moduleName)

export const unSetActiveSeason = (id: number) =>
  unSetActiveDocument<SeasonDto>(id, moduleName)

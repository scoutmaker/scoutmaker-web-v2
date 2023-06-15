import {
  CreatePlayerGradeDto,
  FindAllPlayerGradesParams,
  PlayerGradeDto,
  PlayerGradesFiltersDto,
  UpdatePlayerGradeDto,
} from '@/modules/player-grades/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'player-grades'

export const getPlayerGradeById = (id: string, token?: string) =>
  getAssetById<PlayerGradeDto>({ moduleName, id, token })

export const getPlayerGradesList = (params?: PlayerGradesFiltersDto) =>
  getDataList<PlayerGradeDto, PlayerGradesFiltersDto>(moduleName, params)

export const getPlayerGrades = (params: FindAllPlayerGradesParams) =>
  getPaginatedData<FindAllPlayerGradesParams, PlayerGradeDto>(
    params,
    moduleName,
  )

export const createPlayerGrade = (data: CreatePlayerGradeDto) =>
  createDocument<CreatePlayerGradeDto, PlayerGradeDto>(data, moduleName)

interface IUpdatePlayerGradeArgs {
  id: string
  data: UpdatePlayerGradeDto
}

export const updatePlayerGrade = ({ id, data }: IUpdatePlayerGradeArgs) =>
  updateDocument<UpdatePlayerGradeDto, PlayerGradeDto>(id, data, moduleName)

export const deletePlayerGrade = (id: string) =>
  deleteDocument<PlayerGradeDto>(id, moduleName)

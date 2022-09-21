import {
  CreateMatchDto,
  FindAllMatchesParams,
  MatchBasicDataDto,
  MatchDto,
  MatchesFiltersDto,
  UpdateMatchDto,
} from '@/modules/matches/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'matches'

export const getMatchById = (id: string, token?: string) =>
  getAssetById<MatchDto>({ moduleName, id, token })

export const getMatchesList = (params?: MatchesFiltersDto) =>
  getDataList<MatchBasicDataDto, MatchesFiltersDto>(moduleName, params)

export const getMatches = (params: FindAllMatchesParams) =>
  getPaginatedData<FindAllMatchesParams, MatchDto>(params, moduleName)

export const createMatch = (data: CreateMatchDto) =>
  createDocument<CreateMatchDto, MatchDto>(data, moduleName)

interface IUpdateMatchArgs {
  id: string
  data: UpdateMatchDto
}

export const updateMatch = ({ id, data }: IUpdateMatchArgs) =>
  updateDocument<UpdateMatchDto, MatchDto>(id, data, moduleName)

export const deleteMatch = (id: string) =>
  deleteDocument<MatchDto>(id, moduleName)

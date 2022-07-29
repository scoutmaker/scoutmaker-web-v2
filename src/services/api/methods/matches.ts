import {
  CreateMatchDto,
  FindAllMatchesParams,
  MatchBasicDataDto,
  MatchDto,
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

export const getMatchById = (id: number, token?: string) =>
  getAssetById<MatchDto>({ moduleName, id, token })

export const getMatchesList = () => getDataList<MatchBasicDataDto>(moduleName)

export const getMatches = (params: FindAllMatchesParams) =>
  getPaginatedData<FindAllMatchesParams, MatchDto>(params, moduleName)

export const createMatch = (data: CreateMatchDto) =>
  createDocument<CreateMatchDto, MatchDto>(data, moduleName)

interface IUpdateMatchArgs {
  id: number
  data: UpdateMatchDto
}

export const updateMatch = ({ id, data }: IUpdateMatchArgs) =>
  updateDocument<UpdateMatchDto, MatchDto>(id, data, moduleName)

export const deleteMatch = (id: number) =>
  deleteDocument<MatchDto>(id, moduleName)

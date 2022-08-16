import {
  CompetitionBasicDataDto,
  CompetitionDto,
  CreateCompetitonDto,
  FindAllCompetitionsParams,
  UpdateCompetitionDto,
} from '@/modules/competitions/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'competitions'

export const getCompetitionsList = () =>
  getDataList<CompetitionBasicDataDto>(moduleName)

export const getCompetitionById = (id: number, token?: string) =>
  getAssetById<CompetitionDto>({ moduleName, id, token })

export const getCompetitions = (params: FindAllCompetitionsParams) =>
  getPaginatedData<FindAllCompetitionsParams, CompetitionDto>(
    params,
    moduleName,
  )

export const createCompetition = (data: CreateCompetitonDto) =>
  createDocument<CreateCompetitonDto, CompetitionDto>(data, moduleName)

interface IUpdateArgs {
  id: number
  data: UpdateCompetitionDto
}

export const updateCompetition = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateCompetitionDto, CompetitionDto>(id, data, moduleName)

export const deleteCompetition = (id: number) =>
  deleteDocument<CompetitionDto>(id, moduleName)

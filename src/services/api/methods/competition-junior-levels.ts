import {
  CompetitionJuniorLevelDto,
  CreateCompetitionJuniorLevelDto,
  FindAllCompetitionJuniorLevelsParams,
  UpdateCompetitionJuniorLevelDto,
} from '@/modules/competition-junior-levels/types'

import { TModuleName } from '../modules'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'competition-junior-levels'

export const getCompetitionJuniorLevels = (
  params: FindAllCompetitionJuniorLevelsParams,
) =>
  getPaginatedData<
    FindAllCompetitionJuniorLevelsParams,
    CompetitionJuniorLevelDto
  >(params, moduleName)

export const getCompetitionJuniorLevelsList = () =>
  getDataList<CompetitionJuniorLevelDto>(moduleName)

export const createCompetitionJuniorLevel = (
  data: CreateCompetitionJuniorLevelDto,
) =>
  createDocument<CreateCompetitionJuniorLevelDto, CompetitionJuniorLevelDto>(
    data,
    moduleName,
  )

export const deleteCompetitionJuniorLevel = (id: number) =>
  deleteDocument<CompetitionJuniorLevelDto>(id, moduleName)

interface IUpdateArgs {
  data: UpdateCompetitionJuniorLevelDto
  id: number
}
export const updateCompetitionJuniorLevel = ({ data, id }: IUpdateArgs) =>
  updateDocument<UpdateCompetitionJuniorLevelDto, CompetitionJuniorLevelDto>(
    id,
    data,
    moduleName,
  )

export const getCompetitionJuniorLevelById = (id: number, token?: string) =>
  getAssetById<CompetitionJuniorLevelDto>({ moduleName, id, token })

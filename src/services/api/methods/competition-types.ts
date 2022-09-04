import {
  CompetitionTypeDto,
  CompetitionTypesFindAllParams,
  CreateCompetitionTypeDto,
  UpdateCompetitionTypeDto,
} from '@/modules/competition-types/types'

import { TModuleName } from '../modules'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'competition-types'

export const getCompetitionTypes = (params: CompetitionTypesFindAllParams) =>
  getPaginatedData<CompetitionTypesFindAllParams, CompetitionTypeDto>(
    params,
    moduleName,
  )

export const getCompetitionTypesList = () =>
  getDataList<CompetitionTypeDto>(moduleName)

export const createCompetitionType = (data: CreateCompetitionTypeDto) =>
  createDocument<CreateCompetitionTypeDto, CompetitionTypeDto>(data, moduleName)

export const deleteCompetitionType = (id: number) =>
  deleteDocument<CompetitionTypeDto>(id, moduleName)

interface IUpdateArgs {
  id: number
  data: UpdateCompetitionTypeDto
}

export const updateCompetitionType = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateCompetitionTypeDto, CompetitionTypeDto>(
    id,
    data,
    moduleName,
  )

export const getCompetitionTypeById = (id: number, token?: string) =>
  getAssetById<CompetitionTypeDto>({ moduleName, id, token })

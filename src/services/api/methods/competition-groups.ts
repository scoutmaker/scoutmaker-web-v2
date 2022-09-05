import {
  CompetitionGroupBasicDataDto,
  CompetitionGroupDto,
  CreateCompetitionGroupDto,
  FindAllCompetitionGroupsParams,
  UpdateCompetitionGroupDto,
} from '@/modules/competition-groups/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetById,
  getDataList,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'competition-groups'

export const getCompetitionGroupsList = () =>
  getDataList<CompetitionGroupBasicDataDto>(moduleName)

export const getCompetitionGroups = (params: FindAllCompetitionGroupsParams) =>
  getPaginatedData<FindAllCompetitionGroupsParams, CompetitionGroupDto>(
    params,
    moduleName,
  )

export const createCompetitionGroup = (data: CreateCompetitionGroupDto) =>
  createDocument<CreateCompetitionGroupDto, CompetitionGroupDto>(
    data,
    moduleName,
  )

interface IUpdateArgs {
  id: number
  data: UpdateCompetitionGroupDto
}
export const updateCompetitionGroup = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateCompetitionGroupDto, CompetitionGroupDto>(
    id,
    data,
    moduleName,
  )

export const deleteCompetitionGroup = (id: number) =>
  deleteDocument<CompetitionGroupDto>(id, moduleName)

export const getCompetitionGroupById = (id: number, token?: string) =>
  getAssetById<CompetitionGroupDto>({ id, moduleName, token })

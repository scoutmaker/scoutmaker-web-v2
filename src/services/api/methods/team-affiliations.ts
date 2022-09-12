import {
  CreateTeamAffiliationDto,
  FindAllTeamAffiliationsParams,
  TeamAffiliationDto,
  UpdateTeamAffiliationDto,
} from '@/modules/team-affiliations/types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from '@/services/api/methods/helpers'
import { TModuleName } from '@/services/api/modules'

const moduleName: TModuleName = 'team-affiliations'

export const getTeamAffiliations = (params: FindAllTeamAffiliationsParams) =>
  getPaginatedData<FindAllTeamAffiliationsParams, TeamAffiliationDto>(
    params,
    moduleName,
  )

interface IUpdateArgs {
  id: string
  data: UpdateTeamAffiliationDto
}

export const updateTeamAffiliation = ({ id, data }: IUpdateArgs) =>
  updateDocument<UpdateTeamAffiliationDto, TeamAffiliationDto>(
    id,
    data,
    moduleName,
  )

export const deleteTeamAffiliation = (id: string) =>
  deleteDocument<TeamAffiliationDto>(id, moduleName)

export const createTeamAffiliation = (data: CreateTeamAffiliationDto) =>
  createDocument<CreateTeamAffiliationDto, TeamAffiliationDto>(data, moduleName)

export const getTeamAffiliationById = (id: string, token?: string) =>
  getAssetById<TeamAffiliationDto>({ moduleName, id, token })

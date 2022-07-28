import {
  CreateTeamDto,
  FindAllTeamsParams,
  TeamBasicDataDto,
  TeamDto,
  UpdateTeamDto,
} from '@/modules/teams/types'
import { TModuleName } from '@/services/api/modules'

import {
  createDocument,
  deleteDocument,
  getAssetBySlug,
  getDataList,
  getPaginatedData,
  likeDocument,
  unlikeDocument,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'teams'

export const getTeamBySlug = (slug: string, token?: string) =>
  getAssetBySlug<TeamDto>({ moduleName, slug, token })

export const getTeamsList = () => getDataList<TeamBasicDataDto>(moduleName)

export const getTeams = (params: FindAllTeamsParams) =>
  getPaginatedData<FindAllTeamsParams, TeamDto>(params, moduleName)

export const createTeam = (data: CreateTeamDto) =>
  createDocument<CreateTeamDto, TeamDto>(data, moduleName)

interface IUpdateTeamArgs {
  id: number
  data: UpdateTeamDto
}

export const updateTeam = ({ id, data }: IUpdateTeamArgs) =>
  updateDocument<UpdateTeamDto, TeamDto>(id, data, moduleName)

export const deleteTeam = (id: number) =>
  deleteDocument<TeamDto>(id, moduleName)

export const likeTeam = (id: number) => likeDocument<TeamDto>(id, moduleName)

export const unlikeTeam = (id: number) =>
  unlikeDocument<TeamDto>(id, moduleName)

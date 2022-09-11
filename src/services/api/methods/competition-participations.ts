import {
  CompetitionParticipationDto,
  CreateCompetitionParticipationDto,
  FindAllCompetitionParticipationsParams,
  UpdateCompetitionParticipationDto,
} from '@/modules/competition-participations/types'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'
import { ApiResponse } from '../types'
import {
  createDocument,
  deleteDocument,
  getAssetById,
  getPaginatedData,
  updateDocument,
} from './helpers'

const moduleName: TModuleName = 'competition-participations'

export const getCompetitionParticipations = (
  params: FindAllCompetitionParticipationsParams,
) =>
  getPaginatedData<
    FindAllCompetitionParticipationsParams,
    CompetitionParticipationDto
  >(params, moduleName)

export const createCompetitionParticipation = (
  data: CreateCompetitionParticipationDto,
) =>
  createDocument<
    CreateCompetitionParticipationDto,
    CompetitionParticipationDto
  >(data, moduleName)

interface IUpdateArgs {
  data: UpdateCompetitionParticipationDto
  id: string
}
export const updateCompetitionParticipation = ({ data, id }: IUpdateArgs) =>
  updateDocument<
    UpdateCompetitionParticipationDto,
    CompetitionParticipationDto
  >(id, data, moduleName)

export const deleteCompetitionParticipation = (id: string) =>
  deleteDocument<CompetitionParticipationDto>(id, moduleName)

export const getCompetitionParticipationById = (id: string, token?: string) =>
  getAssetById<CompetitionParticipationDto>({ moduleName, id, token })

export const copyCompetitionParticipations = async (
  fromSeasonId: string,
  toSeasonId: string,
) => {
  const { data } = await client.post<ApiResponse<CompetitionParticipationDto>>(
    `/${moduleName}/copy/${fromSeasonId}/${toSeasonId}`,
  )
  return data
}

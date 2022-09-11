import { AxiosRequestConfig } from 'axios'

import {
  CompetitionParticipationDto,
  CreateCompetitionParticipationDto,
  FindAllCompetitionParticipationsParams,
  UpdateCompetitionParticipationDto,
} from '@/modules/competition-participations/types'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'
import { ApiResponse } from '../types'
import { createDocument, getPaginatedData } from './helpers'

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
  input: UpdateCompetitionParticipationDto
  teamId: string
  competitionId: string
  seasonId: string
}
export const updateCompetitionParticipation = async ({
  input,
  teamId,
  competitionId,
  seasonId,
}: IUpdateArgs) => {
  const { data } = await client.patch<ApiResponse<CompetitionParticipationDto>>(
    `/${moduleName}/${teamId}/${competitionId}/${seasonId}`,
    input,
  )
  return data
}

export const deleteCompetitionParticipation = async ({
  teamId,
  competitionId,
  seasonId,
}: Omit<IUpdateArgs, 'input'>) => {
  const { data } = await client.delete<
    ApiResponse<CompetitionParticipationDto>
  >(`/${moduleName}/${teamId}/${competitionId}/${seasonId}`)
  return data
}

interface IGetByIdArgs extends Omit<IUpdateArgs, 'input'> {
  token: string
}

export const getCompetitionParticipationById = async ({
  teamId,
  competitionId,
  seasonId,
  token,
}: IGetByIdArgs) => {
  const config: AxiosRequestConfig = token
    ? { headers: { 'x-auth-token': token } }
    : {}
  const { data } = await client.get<ApiResponse<CompetitionParticipationDto>>(
    `/${moduleName}/${teamId}/${competitionId}/${seasonId}`,
    config,
  )
  return data.data
}

export const copyCompetitionParticipations = async (
  fromSeasonId: string,
  toSeasonId: string,
) => {
  const { data } = await client.post<ApiResponse<CompetitionParticipationDto>>(
    `/${moduleName}/copy/${fromSeasonId}/${toSeasonId}`,
  )
  return data
}

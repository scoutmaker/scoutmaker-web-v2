import { MatchAttendanceDto } from '@/modules/match-attendances/types'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'
import { ApiResponse } from '../types'

const moduleName: TModuleName = 'match-attendances'

export const getActiveMatchAttendance = async () => {
  const { data } = await client.get<ApiResponse<MatchAttendanceDto | null>>(
    `/${moduleName}/active`,
  )
  return data.data
}

export interface IAddMatchAttendance {
  matchId: string
  observationType: 'LIVE' | 'VIDEO'
}
export const addMatchAttendance = async ({
  observationType,
  matchId,
}: IAddMatchAttendance) => {
  const { data } = await client.post<ApiResponse<MatchAttendanceDto>>(
    `/${moduleName}/${matchId}`,
    { observationType },
  )
  return data
}

export const removeMatchAttendance = async (matchId: string) => {
  const { data } = await client.patch<ApiResponse<MatchAttendanceDto>>(
    `/${moduleName}/${matchId}`,
  )
  return data
}

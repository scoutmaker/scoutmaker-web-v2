import { DashboardDto } from '@/modules/dashboard/types'

import { client } from '../api'
import { TModuleName } from '../modules'
import { ApiResponse } from '../types'

const moduleName: TModuleName = 'dashboard'

export const getDashboardData = async () => {
  const { data } = await client.get<ApiResponse<DashboardDto>>(`/${moduleName}`)
  return data.data
}

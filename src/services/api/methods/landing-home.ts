import { LandingPageNumbers } from '@/modules/landing-home/types'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'

const moduleName: TModuleName = 'landing'

export const getLandingPageNumbers = async () => {
  const { data } = await client.get<LandingPageNumbers>(`/${moduleName}`)
  return data
}

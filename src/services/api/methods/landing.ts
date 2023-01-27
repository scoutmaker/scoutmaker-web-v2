import { LandingPageEmailDto } from '@/components/landing/types'
import { LandingPageNumbers } from '@/modules/landing-home/types'
import { TModuleName } from '@/services/api/modules'

import { client } from '../api'
import { createDocument } from './helpers'

const moduleName: TModuleName = 'landing'

export const getLandingPageNumbers = async () => {
  const { data } = await client.get<LandingPageNumbers>(`/${moduleName}`)
  return data
}

export const sendLandingEmail = (data: LandingPageEmailDto) =>
  createDocument<LandingPageEmailDto, LandingPageEmailDto>(
    data,
    `${moduleName}/mail` as TModuleName,
  )

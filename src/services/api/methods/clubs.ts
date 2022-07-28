import { ClubDto } from '@/modules/clubs/types'

import { getAssetBySlug } from './helpers'

export const getClubBySlug = (slug: string, token?: string) =>
  getAssetBySlug<ClubDto>({ moduleName: 'clubs', slug, token })

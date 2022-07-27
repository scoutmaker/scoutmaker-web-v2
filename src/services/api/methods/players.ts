import { PlayerDto } from '@/modules/players/types'

import { getAssetBySlug } from './helpers'

export const getPlayerBySlug = (slug: string, token?: string) =>
  getAssetBySlug<PlayerDto>({ moduleName: 'players', slug, token })

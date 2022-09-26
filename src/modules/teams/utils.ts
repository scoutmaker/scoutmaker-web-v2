import { IComboOptions } from '@/components/combo/types'
import { Routes } from '@/utils/routes'

import { TeamBasicDataDto } from './types'

export function getSingleTeamRoute(slug: string) {
  return `${Routes.TEAMS}/${slug}`
}

export function mapTeamsListToComboOptions(
  data: TeamBasicDataDto[],
): IComboOptions[] {
  return data.map(({ id, name }) => ({
    id,
    label: name,
  }))
}

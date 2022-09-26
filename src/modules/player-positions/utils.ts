import { IComboOptions } from '@/components/combo/types'

import { PlayerPositionDto } from './types'

export function mapPositionsListToComboOptions(
  data: PlayerPositionDto[],
): IComboOptions[] {
  return data.map(({ id, name }) => ({
    id,
    label: name,
  }))
}

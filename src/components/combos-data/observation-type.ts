import { TFunction } from 'next-i18next'

import { IComboOptions } from '../combo/types'

export const getObservationTypeComboData = (t: TFunction): IComboOptions[] => [
  { id: 'LIVE', label: t('LIVE') },
  { id: 'VIDEO', label: t('VIDEO') },
]

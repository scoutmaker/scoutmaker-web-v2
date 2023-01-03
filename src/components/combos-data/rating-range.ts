import { TFunction } from 'next-i18next'

import { IComboOptions } from '../combo/types'

export const getRatingRangeComboData = (t: TFunction): IComboOptions[] => [
  { id: 'NEGATIVE_SELECTION', label: t('NEGATIVE_SELECTION') },
  { id: 'NO_DECISION', label: t('NO_DECISION') },
  { id: 'TO_OBSERVE', label: t('TO_OBSERVE') },
  { id: 'POSITIVE_SELECTION', label: t('POSITIVE_SELECTION') },
]

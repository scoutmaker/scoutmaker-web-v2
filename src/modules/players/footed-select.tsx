import { TFunction } from 'next-i18next'

import { IComboOptions } from '@/components/combo/types'

export const getFootedComboData = (t: TFunction): IComboOptions[] => [
  { id: 'LEFT', label: t('LEFT') },
  { id: 'RIGHT', label: t('RIGHT') },
  { id: 'BOTH', label: t('BOTH') },
]

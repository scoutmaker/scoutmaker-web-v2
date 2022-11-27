import { TFunction } from 'next-i18next'

import { IComboOptions } from '@/components/combo/types'

export const getGendersComboData = (t: TFunction): IComboOptions[] => [
  { id: 'MALE', label: t('MALES') },
  { id: 'FEMALE', label: t('FEMALES') },
]

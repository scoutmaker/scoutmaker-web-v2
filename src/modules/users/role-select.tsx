import { TFunction } from 'next-i18next'

import { IComboOptions } from '@/components/combo/types'

export const getRolesComboData = (t: TFunction): IComboOptions[] => [
  { id: 'ADMIN', label: t('ADMIN') },
  { id: 'PLAYMAKER_SCOUT', label: t('PLAYMAKER_SCOUT') },
  { id: 'SCOUT', label: t('SCOUT') },
]

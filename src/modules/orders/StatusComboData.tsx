import { TFunction } from 'next-i18next'

export const getStatusComboData = (t: TFunction) => [
  { id: '', label: t('ALL') },
  { id: 'OPEN', label: t('orders:OPEN') },
  { id: 'ACCEPTED', label: t('orders:ACCEPTED') },
  { id: 'CLOSED', label: t('orders:CLOSED') },
]

import { useTranslation } from 'next-i18next'

import { OrdersIcon, PlayersIcon } from '@/components/icons'

import { BasicCard } from '../BasicCard'
import BaseDashboardLayout, { IBaseDashboardProps } from './base'

const PMScoutManagerDashboardLayout = (props: IBaseDashboardProps) => {
  const { t } = useTranslation()

  return (
    <>
      <BaseDashboardLayout {...props} />
      <BasicCard title={t('ORDERS')} linkTo="/orders" icon={<OrdersIcon />} />
      <BasicCard
        title={t('PLAYERS')}
        linkTo="/players"
        icon={<PlayersIcon />}
      />
    </>
  )
}

export default PMScoutManagerDashboardLayout

import { useTranslation } from 'next-i18next'

import { OrdersIcon, PlayersIcon } from '@/components/icons'

import { BasicCard } from '../BasicCard'
import ListDataCard from '../ListDataCard'
import BaseDashboardLayout, { IBaseDashboardProps } from './base'

const PlaymakerScoutManagerDashboardLayout = (
  props: Omit<IBaseDashboardProps, 'variant'>,
) => {
  const { t } = useTranslation()
  const {
    data: { organizations },
  } = props

  return (
    <>
      <BaseDashboardLayout {...props} variant="playmaker-scout" />
      <BasicCard title={t('ORDERS')} linkTo="/orders" icon={<OrdersIcon />} />
      <BasicCard
        title="Ulubieni zawodnicy"
        linkTo="/players"
        icon={<PlayersIcon />}
      />
      <ListDataCard
        title="Organizacje z subskrypcją"
        items={organizations?.map(({ name, id }) => ({ id, text: name })) || []}
      />
    </>
  )
}

export default PlaymakerScoutManagerDashboardLayout

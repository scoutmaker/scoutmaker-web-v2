import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { OrdersIcon, OrganizationsIcon, PlayersIcon } from '@/components/icons'

import { BasicCard } from '../BasicCard'
import ListDataCard from '../ListDataCard'
import BaseDashboardLayout, { IBaseDashboardProps } from './base'

const PMScoutDashboardLayout = (props: IBaseDashboardProps) => {
  const { t } = useTranslation()
  const {
    data: { organizations },
  } = props

  return (
    <>
      <BaseDashboardLayout {...props} />
      <BasicCard title={t('ORDERS')} linkTo="/orders" icon={<OrdersIcon />} />
      <BasicCard
        title={t('PLAYERS')}
        linkTo="/players"
        icon={<PlayersIcon />}
      />
      <ListDataCard
        icon={<OrganizationsIcon />}
        title={t('ORGANIZATIONS')}
        subheader="Udostępnione mecze"
        linkTo=""
        items={
          organizations?.map(({ name, sharedInfo }) => (
            <CardItemBasic title={name} value={sharedInfo} />
          )) || 'ERROR: DATA NOT RECIVED'
        }
      />
    </>
  )
}

export default PMScoutDashboardLayout

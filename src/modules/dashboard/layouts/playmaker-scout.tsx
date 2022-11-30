import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

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
        subheader="Organizacje z aktywnymi subskrypcjami"
        items={
          organizations?.map(({ name }) => (
            <Grid item xs={12}>
              <Typography fontWeight="Bold">{name}</Typography>
            </Grid>
          )) || 'ERROR: DATA NOT RECIVED'
        }
      />
    </>
  )
}

export default PMScoutDashboardLayout

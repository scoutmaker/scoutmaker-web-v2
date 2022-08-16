import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { OrdersIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { OrderDto } from './types'

export const OrderDetailsCard = ({ order }: IDetailsCard) => {
  const { t } = useTranslation()

  const { status, player, createdAt, description, match, scout } = order

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="order icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <OrdersIcon />
          </Avatar>
        }
        title={t('orders:CARD_TITLE')} // ADD_TRANS
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('STATUS')} // ADD_TRANS
            value={t(status)}
          />
          <CardItemBasic
            title={t('PLAYER')}
            value={player ? `${player?.firstName} ${player?.lastName}, ${player?.primaryPosition.name} (${player?.teams[0].team.name})` : ''}
          />
          <CardItemBasic
            title={t('CREATED_DATE')} // ADD_TRANS
            value={formatDate(createdAt)}
          />
          <CardItemBasic
            title={t('DESCRIPTION')} // ADD_TRANS
            value={description || ''}
          />
          <CardItemBasic
            title={t('MATCH')} // ADD_TRANS
            value={match ? `${match.homeTeam.name} vs. ${match.awayTeam.name} (${match.competition.name})` : ''}
          />
          <CardItemBasic
            title={t('SCOUT')} // ADD_TRANS
            value={scout ? `${scout.firstName} ${scout.lastName}` : ''}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  order: OrderDto
}

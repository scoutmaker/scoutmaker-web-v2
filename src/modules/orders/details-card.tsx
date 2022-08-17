import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { AcceptIcon, CloseIcon, OrdersIcon, RejectIcon } from '@/components/icons'
import { Loader } from '@/components/loader/loader'
import { formatDate } from '@/utils/format-date'

import { useAcceptOrder, useCloseOrder, useRejectOrder } from './hooks'
import { OrderStatusChip } from './StatusChip'
import { OrderDto } from './types'

export const OrderDetailsCard = ({ order }: IDetailsCard) => {
  const { t } = useTranslation()

  const { status, player, createdAt, description, match, scout, id } = order

  const { mutate: acceptOrder, isLoading: acceptLoading } = useAcceptOrder()
  const { mutate: rejectOrder, isLoading: rejectLoading } = useRejectOrder()
  const { mutate: closeOrder, isLoading: closeLoading } = useCloseOrder()

  const isLoading = acceptLoading || rejectLoading || closeLoading
  return (<>
    {isLoading && <Loader />}
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
        title={t('orders:CARD_TITLE')}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('STATUS')}
            value={<OrderStatusChip status={status} />}
          />
          <CardItemBasic
            title={t('PLAYER')}
            value={player ? `${player?.firstName} ${player?.lastName}, ${player?.primaryPosition.name} (${player?.teams[0].team.name})` : ''}
          />
          <CardItemBasic
            title={t('CREATED_DATE')}
            value={formatDate(createdAt)}
          />
          <CardItemBasic
            title={t('DESCRIPTION')}
            value={description || ''}
          />
          <CardItemBasic
            title={t('MATCH')}
            value={match ? `${match.homeTeam.name} vs. ${match.awayTeam.name} (${match.competition.name})` : ''}
          />
          <CardItemBasic
            title={t('SCOUT')}
            value={scout ? `${scout.firstName} ${scout.lastName}` : ''}
          />
          <Grid container justifyContent='center'>
            {status === 'OPEN' ?
              <Tooltip title={t('orders:ACCEPT')}>
                <IconButton
                  aria-label="accept order"
                  onClick={() => acceptOrder(id)}
                >
                  <AcceptIcon />
                </IconButton>
              </Tooltip> :
              <>
                <Tooltip title={t('CLOSE')}>
                  <IconButton
                    aria-label="close order"
                    onClick={() => closeOrder(id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={t('REJECT')}>
                  <IconButton
                    aria-label="reject order"
                    onClick={() => rejectOrder(id)}
                  >
                    <RejectIcon />
                  </IconButton>
                </Tooltip>
              </>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>)
}

interface IDetailsCard {
  order: OrderDto
}

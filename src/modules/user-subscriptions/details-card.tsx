import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { UserSubscriptionsIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { UserSubscriptionDto } from './types'

export const UserSubscriptionDetailsCard = ({ userSub }: IDetailsCard) => {
  const { t } = useTranslation()

  const { competitionGroups, competitions, endDate, startDate, user } = userSub

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="user subscription icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <UserSubscriptionsIcon />
          </Avatar>
        }
        title={t('USER_SUBSCRIPTION')}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('USER')}
            value={`${user.firstName} ${user.lastName}`}
          />
          <CardItemBasic
            title={t('COMPETITIONS')}
            value={competitions.map(c => c.name).join(', ')}
          />
          <CardItemBasic
            title={t('COMPETITION_GROUPS')}
            value={competitionGroups.map(g => g.name).join(', ')}
          />
          <CardItemBasic
            title={t('user-subs:START_DATE')}
            value={formatDate(startDate)}
          />
          <CardItemBasic
            title={t('user-subs:END_DATE')}
            value={formatDate(endDate)}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  userSub: UserSubscriptionDto
}

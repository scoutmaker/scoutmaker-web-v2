import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { OrganizationSubscriptionsIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { OrganizationSubscriptionDto } from './types'

export const OrganizationSubscriptionDetailsCard = ({ sub }: IDetailsCard) => {
  const { t } = useTranslation()

  const { endDate, startDate, competitionGroups, competitions, organization } =
    sub

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="organization subscription icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <OrganizationSubscriptionsIcon />
          </Avatar>
        }
        title={t('ORGANIZATION_SUBSCRIPTION')}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('ORGANIZATION')}
            value={organization.name}
            href={`/organizations/${organization.id}`}
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
            title={t('organization-subs:START_DATE')}
            value={formatDate(startDate)}
          />
          <CardItemBasic
            title={t('organization-subs:END_DATE')}
            value={formatDate(endDate)}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  sub: OrganizationSubscriptionDto
}

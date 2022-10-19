import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { OrganizationsIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { getPlayerFullName } from '../players/utils'
import { UserPlayerAceDto } from './types'

export const UserPlayerAceDetailsCard = ({ data }: IDetailsCard) => {
  const { t } = useTranslation()

  const { createdAt, permissionLevel, player, user } = data

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="user player ace icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <OrganizationsIcon />
          </Avatar>
        }
        title={t('USER_PLAYER_ACL')}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('USER')}
            value={`${user.firstName} ${user.lastName} (${user.email})`}
          />
          <CardItemBasic
            title={t('PLAYER')}
            value={getPlayerFullName(player)}
          />
          <CardItemBasic
            title={t('PERMISSION_LEVEL')}
            value={permissionLevel}
          />
          <CardItemBasic
            title={t('CREATED_AT')}
            value={formatDate(createdAt)}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  data: UserPlayerAceDto
}

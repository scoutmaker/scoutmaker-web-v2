import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { GeneralAclIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { getPlayerFullName, getSinglePlayerRoute } from '../players/utils'
import { UserPlayerAclDto } from './types'

export const UserPlayerAclDetailsCard = ({ data }: IDetailsCard) => {
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
            <GeneralAclIcon />
          </Avatar>
        }
        title={t('USER_PLAYER_ACE')}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('USER')}
            value={`${user.firstName} ${user.lastName} (${user.email})`}
            href={`/users/${user.id}`}
          />
          <CardItemBasic
            title={t('PLAYER')}
            value={getPlayerFullName(player)}
            href={getSinglePlayerRoute(player.slug)}
          />
          <CardItemBasic
            title={t('PERMISSION_LEVEL')}
            value={t(`permissions:${permissionLevel}`)}
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
  data: UserPlayerAclDto
}

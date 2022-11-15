import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { UserDataIcon as UserIcon } from '@/components/icons'

import { UserDto } from './types'

export const UserDetailsCard = ({ user }: IDetailsCard) => {
  const { t } = useTranslation()

  const { firstName, lastName, email, phone, region, city, club, role } = user

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="user icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <UserIcon />
          </Avatar>
        }
        title={`${firstName} ${lastName} (${role})`}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('EMAIL')} value={email} />
          <CardItemBasic title={t('PHONE_NUMBER')} value={phone} />
          <CardItemBasic title={t('REGION')} value={region?.name} />
          <CardItemBasic title={t('CITY')} value={city || '-'} />
          <CardItemBasic title={t('CLUB')} value={club?.name || '-'} />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  user: UserDto
}

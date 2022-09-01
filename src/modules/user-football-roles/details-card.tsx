import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { BallIcon } from '@/components/icons'

import { UserFootballRoleDto } from './types'

export const UserFootballRoleDetailsCard = ({ role }: IDetailsCard) => {
  const { t } = useTranslation()

  const { name } = role

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="football icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <BallIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  role: UserFootballRoleDto
}

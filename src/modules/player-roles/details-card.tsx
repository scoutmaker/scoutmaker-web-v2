import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { PlayerRoleIcon } from '@/components/icons'

import { PlayerRoleDto } from './types'

export const PlayerRoleDetailsCard = ({ role }: IDetailsCard) => {
  const { t } = useTranslation()

  const { altName, description, examples, name, positionType } = role

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="player role icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <PlayerRoleIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic title={t('ALT_NAME')} value={altName} />
          <CardItemBasic title={t('POSITION_TYPE')} value={positionType.name} />
          <CardItemBasic title={t('DESCRIPTION')} value={description} />
          <CardItemBasic
            title={t('EXAMPLES')}
            value={examples.map(ex => `${ex.player} - ${ex.type}`).join(', ')}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  role: PlayerRoleDto
}

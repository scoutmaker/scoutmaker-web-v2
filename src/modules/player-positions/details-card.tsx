import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { PlayerPositionIcon } from '@/components/icons'

import { PlayerPositionDto } from './types'

export const PlayerPositionDetailsCard = ({ position }: IDetailsCard) => {
  const { t } = useTranslation()

  const { name, code } = position

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="player position icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <PlayerPositionIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic title={t('CODE')} value={code} />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  position: PlayerPositionDto
}

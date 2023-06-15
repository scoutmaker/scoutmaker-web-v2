import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { PlayerGradeIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { getPlayerFullName } from '../players/utils'
import { PlayerGradeDto } from './types'

export const PlayerGradeDetailsCard = ({ data }: IDetailsCard) => {
  const { t } = useTranslation()

  const { competition, createdAt, grade, player } = data

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="player role icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <PlayerGradeIcon />
          </Avatar>
        }
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('PLAYER')}
            value={getPlayerFullName(player)}
            href={`/players/${player.slug}`}
          />
          <CardItemBasic
            title={t('GRADE')}
            value={t(`player-grades:${grade}`)}
          />
          <CardItemBasic
            title={t('COMPETITION')}
            value={competition.name}
            href={`/competitions/${competition.id}`}
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
  data: PlayerGradeDto
}

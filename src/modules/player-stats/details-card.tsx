import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { PlayerStatsIcon } from '@/components/icons'

import { getMatchDisplayName } from '../matches/utils'
import { getPlayerFullName } from '../players/utils'
import { PlayerStatsDto } from './types'

export const PlayerStatsDetailsCard = ({ stats }: IDetailsCard) => {
  const { t } = useTranslation()

  const {
    assists,
    goals,
    match,
    minutesPlayed,
    player,
    redCards,
    yellowCards,
  } = stats

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="player stats icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <PlayerStatsIcon />
          </Avatar>
        }
        title={t('PLAYER_STATS')}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('PLAYER')}
            value={getPlayerFullName(player)}
          />
          <CardItemBasic
            title={t('MATCH')}
            value={getMatchDisplayName({
              awayTeamName: match.awayTeam.name,
              homeTeamName: match.homeTeam.name,
              competitionName: match.competition.name,
            })}
          />
          <CardItemBasic title={t('ASSISTS')} value={assists} />
          <CardItemBasic title={t('GOALS')} value={goals} />
          <CardItemBasic title={t('MINUTES_PLAYED')} value={minutesPlayed} />
          <CardItemBasic title={t('RED_CARDS')} value={redCards} />
          <CardItemBasic title={t('YELLOW_CARDS')} value={yellowCards} />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  stats: PlayerStatsDto
}

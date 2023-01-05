import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { MatchesIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { MatchDto } from './types'
import { getMatchResult } from './utils'

type IMatchDetailsCard = {
  match: MatchDto
}

export const MatchDetailsCard = ({ match }: IMatchDetailsCard) => {
  const { t } = useTranslation()

  const {
    homeTeam,
    awayTeam,
    competition,
    date,
    group,
    season,
    homeGoals,
    awayGoals,
    videoUrl,
    observationType,
    transfermarktUrl,
  } = match

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="match avatar"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <MatchesIcon />
          </Avatar>
        }
        title={`${competition.name}${group ? ` (${group.name})` : ''}`}
        subheader={formatDate(date)}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('HOME_TEAM')}
            value={homeTeam.name}
            href={`/teams/${homeTeam.slug}`}
          />
          <CardItemBasic
            title={t('AWAY_TEAM')}
            value={awayTeam.name}
            href={`/teams/${awayTeam.slug}`}
          />
          <CardItemBasic title={t('SEASON')} value={season.name} />
          <CardItemBasic
            title={t('RESULT')}
            value={getMatchResult(homeGoals, awayGoals)}
          />
          <CardItemBasic
            title={t('VIDEO_URL')}
            value={videoUrl}
            href={videoUrl}
          />
          <CardItemBasic
            title={t('TRANSFERMARKT_URL')}
            value={transfermarktUrl}
            href={transfermarktUrl}
          />
          <CardItemBasic
            title={t('OBSERVATION_TYPE')}
            value={
              observationType === 'BOTH'
                ? `${t('VIDEO')} + ${t('LIVE')}`
                : t(observationType || '-')
            }
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

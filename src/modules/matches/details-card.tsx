import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link as MUILink,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

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
          <Grid item xs={12}>
            <Typography>
              <strong>{t('HOME_TEAM')}: </strong>
              <Link href={`/teams/${homeTeam.slug}`} passHref>
                <MUILink>{homeTeam.name}</MUILink>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('AWAY_TEAM')}: </strong>
              <Link href={`/teams/${awayTeam.slug}`} passHref>
                <MUILink>{awayTeam.name}</MUILink>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('SEASON')}: </strong>
              {season.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('RESULT')}: </strong>
              {getMatchResult(homeGoals, awayGoals)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('VIDEO_URL')}: </strong>
              {videoUrl ? <Link href={videoUrl}>{videoUrl || '-'}</Link> : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('OBSERVATION_TYPE')}: </strong>
              {observationType === 'BOTH'
                ? `${t('VIDEO')} + ${t('LIVE')}`
                : t(observationType || '-')}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

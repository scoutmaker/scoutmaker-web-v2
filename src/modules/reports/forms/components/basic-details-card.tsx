import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import {
  getMatchDisplayName,
  getSingleMatchRoute,
} from '@/modules/matches/utils'
import {
  getPlayerFullName,
  getSinglePlayerRoute,
} from '@/modules/players/utils'
import { StatusChip } from '@/modules/reports/status-chip'
import { getSingleTeamRoute } from '@/modules/teams/utils'
import { formatDate } from '@/utils/format-date'

import { ReportDto } from '../../types'

interface IReportBasicDetailsCard {
  report: ReportDto
}

export const BasicDetailsCard = ({ report }: IReportBasicDetailsCard) => {
  const { t } = useTranslation(['common', 'reports'])

  const {
    createdAt,
    match,
    percentageRating,
    player,
    shirtNo,
    avgRating,
    template,
    status,
    meta,
    author,
  } = report

  return (
    <Card>
      <CardHeader title={t('reports:BASIC_INFO')} />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('PLAYER')}
            value={player ? getPlayerFullName(player) : '-'}
            href={player ? getSinglePlayerRoute(player.slug) : undefined}
          />
          <CardItemBasic
            title={t('TEAM')}
            value={meta?.team?.name || '-'}
            href={meta?.team ? getSingleTeamRoute(meta.team.slug) : undefined}
          />
          <CardItemBasic
            title={t('MATCH')}
            value={
              match
                ? getMatchDisplayName({
                    homeTeamName: match.homeTeam.name,
                    awayTeamName: match.awayTeam.name,
                    competitionName: match.competition?.name,
                  })
                : '-'
            }
            href={match ? getSingleMatchRoute(match.id) : undefined}
          />
          <CardItemBasic
            title={t('MATCH_DATE')}
            value={match ? formatDate(match.date) : '-'}
          />
          <CardItemBasic
            title={t('reports:POSITION_PLAYED')}
            value={meta?.position.name}
          />
          <CardItemBasic title={t('SHIRT_NO')} value={shirtNo} />
          <CardItemBasic
            title={t('reports:AVERAGE_RATING')}
            value={`${avgRating}/${template.maxRatingScore}`}
          />
          <CardItemBasic
            title={t('PERCENTAGE_RATING')}
            value={percentageRating ? `${percentageRating.toFixed(1)}%` : '-'}
          />
          <CardItemBasic
            title={t('AUTHOR')}
            value={getPlayerFullName({
              firstName: author.firstName,
              lastName: author.lastName,
            })}
          />
          <CardItemBasic
            title={t('reports:STATUS')}
            value={<StatusChip status={status} />}
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

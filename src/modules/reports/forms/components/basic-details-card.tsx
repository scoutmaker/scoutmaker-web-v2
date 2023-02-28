import { Download as DownloadIcon } from '@mui/icons-material'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import {
  getMatchDisplayName,
  getSingleMatchRoute,
} from '@/modules/matches/utils'
import { getPositionDisplayName } from '@/modules/player-positions/utils'
import {
  getPlayerFullName,
  getSinglePlayerRoute,
} from '@/modules/players/utils'
import { StatusChip } from '@/modules/reports/status-chip'
import { getSingleTeamRoute } from '@/modules/teams/utils'
import { formatDate } from '@/utils/format-date'

import { getAuthorDisplayName } from '../../../users/utils'
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
    maxRatingScore,
    status,
    meta,
    author,
    observationType,
  } = report

  const team = meta?.team || player.teams[0]?.team

  return (
    <Card>
      <CardHeader
        title={t('reports:BASIC_INFO')}
        subheader={`${t('AUTHOR')}: ${getAuthorDisplayName(author)}`}
        titleTypographyProps={{ width: 'max-content' }}
        subheaderTypographyProps={{ width: 'max-content' }}
        action={
          <Link href={`/reports/${report.id}/print`} passHref>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              component="a"
            >
              PDF
            </Button>
          </Link>
        }
        sx={{
          '& .MuiCardHeader-content': {
            flex: 0,
          },
          '& ': {
            gap: 2.5,
            alignItems: 'center',
          },
          '& .MuiCardHeader-action': {
            alignSelf: 'center',
          },
        }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('PLAYER')}
            value={player ? getPlayerFullName(player) : '-'}
            href={player ? getSinglePlayerRoute(player.slug) : undefined}
          />
          <CardItemBasic
            title={t('TEAM')}
            value={team?.name || '-'}
            href={team ? getSingleTeamRoute(team.slug) : undefined}
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
            title={t('OBSERVATION_TYPE')}
            value={t(observationType)}
          />
          <CardItemBasic
            title={t('reports:POSITION_PLAYED')}
            value={meta ? getPositionDisplayName(meta.position) : undefined}
          />
          <CardItemBasic title={t('SHIRT_NO')} value={shirtNo} />
          <CardItemBasic
            title={t('reports:AVERAGE_RATING')}
            value={`${avgRating}/${maxRatingScore}`}
          />
          <CardItemBasic
            title={t('PERCENTAGE_RATING')}
            value={percentageRating ? `${percentageRating.toFixed(1)}%` : '-'}
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

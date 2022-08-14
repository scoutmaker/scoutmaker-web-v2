import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Rating,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { BallIcon, NotesIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { getMatchDisplayName, getSingleMatchRoute } from '../matches/utils'
import { getPlayerFullName, getSinglePlayerRoute } from '../players/utils'
import { getSingleTeamRoute } from '../teams/utils'
import { NoteDto } from './types'

interface INoteDetailsCard {
  note: NoteDto
}

export const NoteDetailsCard = ({ note }: INoteDetailsCard) => {
  const { t } = useTranslation()

  const {
    id,
    author,
    createdAt,
    description,
    match,
    percentageRating,
    rating,
    maxRatingScore,
    player,
    shirtNo,
    meta,
  } = note

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="note avatar"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <NotesIcon />
          </Avatar>
        }
        title={t('NOTE_DETAILS_TITLE', {
          number: `${id}/${new Date(createdAt).getFullYear}`,
        })}
        subheader={`${t('AUTHOR')}: ${author.firstName} ${author.lastName}`}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('PLAYER')}
            value={player ? getPlayerFullName(player) : '-'}
            href={player ? getSinglePlayerRoute(player.slug) : undefined}
          />
          <CardItemBasic
            title={t('notes:TEAM')}
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
                    competitionName: match.competition.name,
                  })
                : '-'
            }
            href={match ? getSingleMatchRoute(match.id) : undefined}
          />
          <CardItemBasic
            title={t('notes:MATCH_DATE')}
            value={match ? formatDate(match.date) : '-'}
          />
          <CardItemBasic
            title={t('notes:POSITION_PLAYED')}
            value={meta?.position.name}
          />
          <CardItemBasic
            title={t('notes:SHIRT_NO')}
            value={shirtNo?.toString()}
          />
          <CardItemBasic
            title={t('RATING')}
            value={
              <Rating
                value={rating}
                readOnly
                max={maxRatingScore}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: 'secondary.light',
                  },
                }}
                icon={<BallIcon />}
                emptyIcon={<BallIcon />}
              />
            }
          />
          <CardItemBasic
            title={t('PERCENTAGE_RATING')}
            value={percentageRating ? `${percentageRating.toFixed(1)}%` : '-'}
          />
          <CardItemBasic title={t('notes:DESCRIPTION')} value={description} />
        </Grid>
      </CardContent>
    </Card>
  )
}

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Rating,
} from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { BallIcon, NotesIcon } from '@/components/icons'
import { getPositionDisplayName } from '@/modules/player-positions/utils'
import { formatDate } from '@/utils/format-date'

import { getDocumentNumber } from '../../utils/get-document-number'
import { getMatchDisplayName, getSingleMatchRoute } from '../matches/utils'
import { getPlayerFullName, getSinglePlayerRoute } from '../players/utils'
import { getSingleTeamRoute } from '../teams/utils'
import { getAuthorDisplayName } from '../users/utils'
import { NoteDto } from './types'

interface INoteDetailsCard {
  note: NoteDto
}

export const NoteDetailsCard = ({ note }: INoteDetailsCard) => {
  const { t } = useTranslation(['common', 'notes'])

  const {
    author,
    createdAt,
    description,
    match,
    percentageRating,
    docNumber,
    rating,
    maxRatingScore,
    player,
    shirtNo,
    meta,
    observationType,
    id,
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
        title={t('notes:NOTE_DETAILS_TITLE', {
          number: getDocumentNumber({ docNumber, createdAt }),
        })}
        subheader={`${t('AUTHOR')}: ${getAuthorDisplayName(author)}`}
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Link href={`/notes/edit/${id}`}>
            <Button variant="contained">{t('EDIT')}</Button>
          </Link>
        }
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
            title={t('MATCH_DATE')}
            value={match ? formatDate(match.date) : '-'}
          />
          <CardItemBasic
            title={t('notes:POSITION_PLAYED')}
            value={
              meta?.position ? getPositionDisplayName(meta.position) : undefined
            }
          />
          <CardItemBasic title={t('SHIRT_NO')} value={shirtNo?.toString()} />
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
          <CardItemBasic title={t('TEXT')} value={description} />
          <CardItemBasic
            title={t('OBSERVATION_TYPE')}
            value={t(observationType)}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

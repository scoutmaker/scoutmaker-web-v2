import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { InsiderNotesIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { getPlayerFullName, getSinglePlayerRoute } from '../players/utils'
import { getSingleTeamRoute } from '../teams/utils'
import { InsiderNoteDto } from './types'

interface IInsiderNoteDetailsCard {
  note: InsiderNoteDto
}

export const InsiderNoteDetailsCard = ({ note }: IInsiderNoteDetailsCard) => {
  const { t } = useTranslation()

  const {
    createdAt, id, player, description, informant, meta, author
  } = note

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="insider note avatar"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <InsiderNotesIcon />
          </Avatar>
        }
        title={t('insider-notes:DETAILS_TITLE', {
          nr: `${id}/${new Date(createdAt).getFullYear()}`
        })}
        subheader={`${t('AUTHOR')}: ${author.firstName} ${author.lastName}`}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('PLAYER')}
            value={getPlayerFullName(player)}
            href={getSinglePlayerRoute(player.slug)}
          />
          <CardItemBasic
            title={t('PRIMARY_POSITION')}
            value={player.primaryPosition.name}
          />
          <CardItemBasic
            title={t('INFORMATOR')}
            value={informant || '-'}
          />
          <CardItemBasic
            title={t('TEAM')}
            value={meta?.team?.name || '-'}
            href={meta?.team ? getSingleTeamRoute(meta.team.slug) : undefined}
          />
          <CardItemBasic title={t('DESCRIPTION')} value={description} />
          <CardItemBasic
            title={t('COMPETITION')}
            value={
              meta?.competition ? meta.competition.name : '-'
            }
          />
          <CardItemBasic
            title={t('COMPETITION_GROUP')}
            value={
              meta?.competitionGroup ? meta.competitionGroup.name : '-'
            }
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

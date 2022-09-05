import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { CompetitionIcon } from '@/components/icons'

import { CompetitionParticipationDto } from './types'

export const CompetitionParticipationDetailsCard = ({ comp }: IDetailsCard) => {
  const { t } = useTranslation()

  const { competition, group, season, team } = comp

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="competition icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <CompetitionIcon />
          </Avatar>
        }
        title={t('COMPETITION_PARTICIPATION')}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('TEAM')} value={team.name} href={`/teams/${team.slug}`} />
          <CardItemBasic
            title={t('COMPETITION')}
            value={competition.name}
            href={`/competitions/${competition.id}`}
          />
          <CardItemBasic
            title={t('COMPETITION_GROUP')}
            value={group?.name}
            href={group ? `/competition-groups/${group.id}` : undefined}
          />
          <CardItemBasic
            title={t('SEASON')}
            value={season.name}
            href={`/seasons/${season.id}`}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  comp: CompetitionParticipationDto
}

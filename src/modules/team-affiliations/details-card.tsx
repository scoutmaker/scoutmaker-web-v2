import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { TeamAffiliationIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { getPlayerFullName, getSinglePlayerRoute } from '../players/utils'
import { getSingleTeamRoute } from '../teams/utils'
import { TeamAffiliationDto } from './types'

export const TeamAffiliationDetailsCard = ({ affiliation }: IDetailsCard) => {
  const { t } = useTranslation()

  const { player, startDate, team, endDate } = affiliation

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="team affiliation icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <TeamAffiliationIcon />
          </Avatar>
        }
        title={t('TEAM_AFFILIATION')}
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
            title={t('TEAM')}
            value={team.name}
            href={getSingleTeamRoute(team.slug)}
          />
          <CardItemBasic
            title={t('team-affiliations:START_DATE')}
            value={formatDate(startDate)}
          />
          <CardItemBasic
            title={t('team-affiliations:END_DATE')}
            value={endDate ? formatDate(endDate) : '-'}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  affiliation: TeamAffiliationDto
}

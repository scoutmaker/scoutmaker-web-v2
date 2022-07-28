import { GroupWork as TeamsIcon } from '@mui/icons-material'
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

import { TeamDto } from '@/modules/teams/types'
import { CompetitionParticipationWithoutTeamDto } from '@/types/competitions'

function getCompetitionDisplayName(
  participation?: CompetitionParticipationWithoutTeamDto,
) {
  if (!participation || !participation.competition) {
    return ''
  }

  if (participation.group) {
    return `${participation.competition.name}, ${participation.group.name}`
  }

  return participation.competition.name
}

type ITeamDetailsCard = {
  team: TeamDto
}

export const TeamDetailsCard = ({ team }: ITeamDetailsCard) => {
  const { t } = useTranslation()

  const { club, competitions, name, lnpId, minut90url, transfermarktUrl } = team

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="team avatar"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <TeamsIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('CLUB')}: </strong>
              <Link href={`/clubs/${club.slug}`} passHref>
                <MUILink>{club.name}</MUILink>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('COMPETITION')}: </strong>
              {getCompetitionDisplayName(competitions[0])}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('LNP_ID')}: </strong>
              {lnpId || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('90_MINUT_URL')}: </strong>
              {minut90url ? (
                <MUILink href={minut90url}>{minut90url}</MUILink>
              ) : (
                '-'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('TRANSFERMARKT_URL')}: </strong>
              {transfermarktUrl ? (
                <MUILink href={transfermarktUrl}>{transfermarktUrl}</MUILink>
              ) : (
                '-'
              )}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

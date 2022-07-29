import { DirectionsRun as PlayersIcon } from '@mui/icons-material'
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

import { PlayerDto } from '@/modules/players/types'
import { getFlagEmoji } from '@/utils/get-flag-emoji'

interface IPlayerDetailsCard {
  player: PlayerDto
}

export const PlayerDetialsCard = ({ player }: IPlayerDetailsCard) => {
  const { t } = useTranslation(['common', 'players'])

  const {
    firstName,
    lastName,
    yearOfBirth,
    height,
    weight,
    footed,
    lnpId,
    lnpUrl,
    minut90id,
    minut90url,
    transfermarktId,
    transfermarktUrl,
    country,
    primaryPosition,
    secondaryPositions,
    teams,
  } = player

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="player avatar"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <PlayersIcon />
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('COUNTRY')}: </strong>
              {`${getFlagEmoji(country.code)} ${country.name}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('YEAR_OF_BIRTH')}: </strong>
              {yearOfBirth}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('HEIGHT')}: </strong>
              {height ? `${height} cm` : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('WEIGHT')}: </strong>
              {weight ? `${weight} kg` : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('FOOTED')}: </strong>
              {t(footed)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('players:CURRENT_TEAM')}: </strong>
              {teams[0].team ? (
                <Link href={`/teams/${teams[0].team.slug}`} passHref>
                  <MUILink>{teams[0].team.name}</MUILink>
                </Link>
              ) : (
                '-'
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('PRIMARY_POSITION')}: </strong>
              {primaryPosition.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('SECONDARY_POSITIONS')}: </strong>
              {secondaryPositions.map(position => position.name).join(', ')}
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
              <strong>{t('LNP_URL')}: </strong>
              {lnpUrl ? <MUILink href={lnpUrl}>{lnpUrl}</MUILink> : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('90_MINUT_ID')}: </strong>
              {minut90id || '-'}
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
              <strong>{t('TRANSFERMARKT_ID')}: </strong>
              {transfermarktId || '-'}
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

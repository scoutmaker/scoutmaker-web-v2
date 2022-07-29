import { Security as ClubsIcon } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { getFlagEmoji } from '../../utils/get-flag-emoji'
import { ClubDto } from './types'

type IClubDetailsCard = {
  club: ClubDto
}

export const ClubDetailsCard = ({ club }: IClubDetailsCard) => {
  const { t } = useTranslation()

  const {
    name,
    region,
    country,
    lnpId,
    city,
    postalCode,
    street,
    website,
    twitter,
    facebook,
    instagram,
  } = club

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="club avatar"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <ClubsIcon />
          </Avatar>
        }
        title={name}
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
              <strong>{t('REGION')}: </strong>
              {region.name}
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
              <strong>{t('CITY')}: </strong>
              {city || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('POSTAL_CODE')}: </strong>
              {postalCode || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('STREET')}: </strong>
              {street || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('WEBSITE_URL')}: </strong>
              {website ? <Link href={website}>{website || '-'}</Link> : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('TWITTER_URL')}: </strong>
              {twitter ? <Link href={twitter}>{twitter || '-'}</Link> : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('FACEBOOK_URL')}: </strong>
              {facebook ? <Link href={facebook}>{facebook || '-'}</Link> : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('INSTAGRAM_URL')}: </strong>
              {instagram ? (
                <Link href={instagram}>{instagram || '-'}</Link>
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

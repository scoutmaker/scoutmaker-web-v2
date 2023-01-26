import { Security as ClubsIcon } from '@mui/icons-material'
import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'

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
          <CardItemBasic
            title={t('COUNTRY')}
            value={`${getFlagEmoji(country.code)} ${country.name}`}
          />
          <CardItemBasic title={t('REGION')} value={region?.name} />
          <CardItemBasic title={t('CITY')} value={city} />
          <CardItemBasic title={t('POSTAL_CODE')} value={postalCode} />
          <CardItemBasic title={t('STREET')} value={street} />
          <CardItemBasic
            title={t('WEBSITE_URL')}
            value={website}
            href={website}
            linkInNewCard
          />
          <CardItemBasic
            title={t('TWITTER_URL')}
            value={twitter}
            href={twitter}
            linkInNewCard
          />
          <CardItemBasic
            title={t('FACEBOOK_URL')}
            value={facebook}
            href={facebook}
            linkInNewCard
          />
          <CardItemBasic
            title={t('INSTAGRAM_URL')}
            value={instagram}
            href={instagram}
            linkInNewCard
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { CountryIcon } from '@/components/icons'

import { CountryDto } from './types'

export const CountryDetailsCard = ({ country }: ICountryDetailsCard) => {
  const { t } = useTranslation()

  const { name, code, isEuMember } = country

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="country icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <CountryIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic title={t('countries:CODE')} value={code} />
          <CardItemBasic
            title={t('countries:IS_EU_MEMBER')}
            value={isEuMember ? t('YES') : t('NO')}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface ICountryDetailsCard {
  country: CountryDto
}

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CountryIcon } from '@/components/icons'

import { CountryDto } from './types'

const CardItem = ({ categ, value }: IitemProps) =>
(<Grid item xs={12}>
  <Typography>
    <strong>{categ}: </strong>
    {value}
  </Typography>
</Grid>)

export const CountryDetailsCard = ({ country }: ICountryDetailsCard) => {
  const { t } = useTranslation()

  const {
    name,
    code,
    isEuMember
  } = country

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
          <CardItem
            categ={t('NAME')}
            value={name}
          />
          <CardItem
            categ={t('countries:CODE')}
            value={code}
          />
          <CardItem
            categ={t('countries:IS_EU_MEMBER')}
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

interface IitemProps {
  categ: string
  value: string
}
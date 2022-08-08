import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { RegionIcon } from '@/components/icons'

import { RegionDto } from './types'

// TO_CHANGE
const CardItem = ({ categ, value }: IitemProps) =>
(<Grid item xs={12}>
  <Typography>
    <strong>{categ}: </strong>
    {value}
  </Typography>
</Grid>)

export const RegionDetailsCard = ({ region }: IRegionDetailsCard) => {
  const { t } = useTranslation()

  const {
    name,
    country
  } = region

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="region icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <RegionIcon />
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
            categ={t('COUNTRY')}
            value={country.name}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IRegionDetailsCard {
  region: RegionDto
}

interface IitemProps {
  categ: string
  value: string
} 
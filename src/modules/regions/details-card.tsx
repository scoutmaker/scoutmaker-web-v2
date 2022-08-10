import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card-item'
import { RegionIcon } from '@/components/icons'

import { RegionDto } from './types'

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
          <CardItemBasic
            categ={t('NAME')}
            value={name}
          />
          <CardItemBasic
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

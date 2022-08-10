import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card-item'
import { SeasonIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { SeasonDto } from './types'

export const SeasonDetailsCard = ({ season }: IDetailsCard) => {
  const { t } = useTranslation()

  const {
    name,
    endDate,
    startDate,
    isActive
  } = season

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="season icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <SeasonIcon />
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
            categ={t('seasons:START_DATE')}
            value={formatDate(startDate)}
          />
          <CardItemBasic
            categ={t('seasons:END_DATE')}
            value={formatDate(endDate)}
          />
          <CardItemBasic
            categ={t('seasons:IS_ACTIVE')}
            value={isActive ? t('YES') : t('NO')}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  season: SeasonDto
}
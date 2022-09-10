import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { ReportBackgroundImagesIcon } from '@/components/icons'

import { ReportBgImageDto } from './types'

export const ReportBgImageDetailsCard = ({ repbg }: ICountryDetailsCard) => {
  const { t } = useTranslation()

  const { name, url } = repbg

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="report background image icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <ReportBackgroundImagesIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic title={t('URL')} value={url} href={url} />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface ICountryDetailsCard {
  repbg: ReportBgImageDto
}

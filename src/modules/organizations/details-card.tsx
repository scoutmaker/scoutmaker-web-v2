import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { OrganizationsIcon } from '@/components/icons'
import { formatDate } from '@/utils/format-date'

import { OrganizationDto } from './types'

export const OrganizationDetailsCard = ({ organization }: IDetailsCard) => {
  const { t } = useTranslation()

  const { name, createdAt, logoUrl } = organization

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="organization icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <OrganizationsIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic title={t('LOGO_URL')} value={logoUrl} href={logoUrl} />
          <CardItemBasic
            title={t('CREATED_AT')}
            value={formatDate(createdAt)}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  organization: OrganizationDto
}

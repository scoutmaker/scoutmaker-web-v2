import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { CompetitionIcon } from '@/components/icons'

import { CompetitionGroupDto } from './types'

export const CompetitionGroupDetailsCard = ({ group }: IDetailsCard) => {
  const { t } = useTranslation()

  const { name, competition, regions } = group

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="competition icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <CompetitionIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic
            title={t('NAME')}
            value={name}
          />
          <CardItemBasic
            title={t('COMPETITION')}
            value={competition.name}
            href={`/competitions/${competition.id}`}
          />
          <CardItemBasic
            title={t('REGIONS')}
            value={regions.map(region => region.name).join(', ')}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  group: CompetitionGroupDto
}

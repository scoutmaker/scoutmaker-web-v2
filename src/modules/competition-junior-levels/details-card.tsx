import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { CompetitionIcon } from '@/components/icons'

import { CompetitionJuniorLevelDto } from './types'

export const CompetitionJuniorLevelDetailsCard = ({ comp }: IDetailsCard) => {
  const { t } = useTranslation()

  const { name, level } = comp

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
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic
            title={t('LEVEL')}
            value={level}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  comp: CompetitionJuniorLevelDto
}

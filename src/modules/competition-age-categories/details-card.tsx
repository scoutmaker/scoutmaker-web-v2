import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { AgeCategoryIcon } from '@/components/icons'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'

export const CompetitionAgeCategoryDetailsCard = ({ data }: IDetailsCard) => {
  const { t } = useTranslation()

  const { name } = data

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="category icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <AgeCategoryIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  data: CompetitionAgeCategortyDto
}

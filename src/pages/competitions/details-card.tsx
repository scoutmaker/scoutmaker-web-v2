import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card-item'
import { CompetitionIcon } from '@/components/icons'
import { CompetitionDto } from '@/modules/competitions/types'

type IDetailsCard = {
  comp: CompetitionDto
}

export const CompetitionDetailsCard = ({ comp }: IDetailsCard) => {
  const { t } = useTranslation()

  const { ageCategory, country, gender, level, name, type, juniorLevel } = comp

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="competition avatar"
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
          <CardItemBasic categ={t('NAME')} value={name} />
          <CardItemBasic categ={t('COMPETITION_AGE_CATEGORY')} value={ageCategory.name} />
          <CardItemBasic categ={t('COUNTRY')} value={country.name} />
          <CardItemBasic categ={t('GENDER')} value={gender} />
          <CardItemBasic categ={t('LEVEL')} value={level.toString()} />
          <CardItemBasic categ={t('COMPETITION_TYPE')} value={type.name} />
          <CardItemBasic categ={t('COMPETITION_JUNIOR_LEVEL')} value={juniorLevel?.name || ''} />
        </Grid>
      </CardContent>
    </Card>
  )
}

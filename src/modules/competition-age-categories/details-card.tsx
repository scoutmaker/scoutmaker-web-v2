import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Category } from '@/components/icons'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'

// TO_CHANGE
const CardItem = ({ categ, value }: IitemProps) =>
(<Grid item xs={12}>
  <Typography>
    <strong>{categ}: </strong>
    {value}
  </Typography>
</Grid>)

export const CompetitionAgeCategoryDetailsCard = ({ data }: IDetailsCard) => {
  const { t } = useTranslation()

  const {
    name
  } = data

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="category icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <Category />
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
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  data: CompetitionAgeCategortyDto
}

interface IitemProps {
  categ: string
  value: string
} 
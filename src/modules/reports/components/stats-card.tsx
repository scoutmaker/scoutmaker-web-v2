import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'

import { ReportDto } from '../types'

interface IStatsCardProps {
  report: ReportDto
}

export const StatsCard = ({ report }: IStatsCardProps) => {
  const { t } = useTranslation(['common', 'reports'])

  const { minutesPlayed, goals, assists, yellowCards, redCards } = report

  return (
    <Card>
      <CardHeader title={t('reports:SUMMARY_CARD_TITLE')} />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('MINUTES_PLAYED')} value={minutesPlayed} />
          <CardItemBasic title={t('GOALS')} value={goals} />
          <CardItemBasic title={t('ASSISTS')} value={assists} />
          <CardItemBasic title={t('YELLOW_CARDS')} value={yellowCards} />
          <CardItemBasic title={t('RED_CARDS')} value={redCards} />
        </Grid>
      </CardContent>
    </Card>
  )
}

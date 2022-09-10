import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { RatingChip } from '@/components/rating-chip/rating-chip'

import { ReportDto } from '../types'

interface ISummaryCardProps {
  report: ReportDto
}

export const SummaryCard = ({ report }: ISummaryCardProps) => {
  const { t } = useTranslation(['common', 'reports'])

  const {
    summary,
    finalRating,
    avgRating,
    percentageRating,
    videoUrl,
    videoDescription,
  } = report

  return (
    <Card>
      <CardHeader title={t('reports:SUMMARY_CARD_TITLE')} />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('reports:SUMMARY')} value={summary} />
          <CardItemBasic title={t('VIDEO_URL')} value={videoUrl} />
          <CardItemBasic
            title={t('VIDEO_DESCRIPTION')}
            value={videoDescription}
          />
          <CardItemBasic
            title={t('reports:FINAL_RATING')}
            value={
              finalRating ? <RatingChip rating={finalRating} /> : undefined
            }
          />
          <CardItemBasic
            title={t('reports:AVERAGE_RATING')}
            value={
              avgRating && percentageRating
                ? `${avgRating.toFixed(2)} (${percentageRating.toFixed(1)}%)`
                : undefined
            }
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

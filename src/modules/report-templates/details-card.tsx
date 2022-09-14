import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { ReportTemplatesIcon } from '@/components/icons'

import { ReportTemplateDto } from './types'

export const ReportTemplatesDetailsCard = ({ reportTemplate }: IRegionDetailsCard) => {
  const { t } = useTranslation()

  const { name, maxRatingScore, skillAssessmentTemplates } = reportTemplate

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="report templates icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <ReportTemplatesIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic title={t('MAX_RATING_SCORE')} value={maxRatingScore} />
          <CardItemBasic title={t('REPORT_SKILL_ASSESSMENT_TEMPLATES')} value={skillAssessmentTemplates.map(e => e.name).join(', ')} />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IRegionDetailsCard {
  reportTemplate: ReportTemplateDto
}

import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { ReportSkillAssessmentCategoriesIcon } from '@/components/icons'

import { ReportSkillAssessmentTemplateDto } from './types'

export const ReportSkillAssessmentTemplateDetailsCard = ({
  report,
}: IDetailsCard) => {
  const { t } = useTranslation()

  const { name, category, hasScore, shortName } = report

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="report skill assessment icon"
            sx={{ backgroundColor: 'secondary.main', width: 50, height: 50 }}
          >
            <ReportSkillAssessmentCategoriesIcon />
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <CardItemBasic title={t('NAME')} value={name} />
          <CardItemBasic title={t('SHORT_NAME')} value={shortName} />
          <CardItemBasic title={t('CATEGORY')} value={category.name} />
          <CardItemBasic
            title={t('report-skill-assessment-templates:HAS_SCORE')}
            value={hasScore ? t('YES') : t('NO')}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

interface IDetailsCard {
  report: ReportSkillAssessmentTemplateDto
}

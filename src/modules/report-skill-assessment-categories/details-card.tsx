import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardItemBasic } from '@/components/details-card/details-card-item'
import { ReportSkillAssessmentCategoriesIcon } from '@/components/icons'

import { ReportSkillAssessmentCategoryDto } from './types'

interface IDetailsCardProps {
  data: ReportSkillAssessmentCategoryDto
}

export const ReportSkillAssessmentCategoryDetailsCard = ({
  data,
}: IDetailsCardProps) => {
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
            <ReportSkillAssessmentCategoriesIcon />
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

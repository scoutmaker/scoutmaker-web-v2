import { Card, CardContent, CardHeader, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { RatingInput } from '@/components/rating-input/rating-input'

import { CreateReportDto } from '../../types'

export const SummaryCard = () => {
  const { t } = useTranslation(['common', 'reports'])
  const { touched, errors } = useFormikContext<CreateReportDto>()

  return (
    <Card>
      <CardHeader title={t('reports:EDIT_SUMMARY_CARD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <RatingInput max={4} name="finalRating" />
        <Field
          name="summary"
          as={TextField}
          variant="outlined"
          fullWidth
          multiline
          label={t('reports:SUMMARY')}
          error={touched.summary && !!errors.summary}
          helperText={touched.summary && errors.summary}
        />
      </CardContent>
    </Card>
  )
}

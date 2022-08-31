import { Box, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { RatingInput } from '@/components/rating-input/rating-input'

import { CreateReportDto } from '../types'

export const SummaryStep = () => {
  const { t } = useTranslation()
  const { touched, errors, values } = useFormikContext<CreateReportDto>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <RatingInput max={4} value={values.finalRating} name="finalRating" />
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
    </Box>
  )
}

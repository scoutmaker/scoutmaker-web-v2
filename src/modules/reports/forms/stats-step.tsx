import { Box, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { CreateReportDto } from '../types'

export const StatsStep = () => {
  const { t } = useTranslation()
  const { touched, errors } = useFormikContext<CreateReportDto>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Field
        name="minutesPlayed"
        as={TextField}
        variant="outlined"
        type="number"
        inputProps={{ min: 0, max: 120 }}
        fullWidth
        label={t('MINUTES_PLAYED')}
        error={touched.minutesPlayed && !!errors.minutesPlayed}
        helperText={touched.minutesPlayed && errors.minutesPlayed}
      />
      <Field
        name="goals"
        as={TextField}
        variant="outlined"
        type="number"
        inputProps={{ min: 0 }}
        fullWidth
        label={t('GOALS')}
        error={touched.goals && !!errors.goals}
        helperText={touched.goals && errors.goals}
      />
      <Field
        name="assists"
        as={TextField}
        variant="outlined"
        type="number"
        inputProps={{ min: 0 }}
        fullWidth
        label={t('ASSISTS')}
        error={touched.assists && !!errors.assists}
        helperText={touched.assists && errors.assists}
      />
      <Field
        name="yellowCards"
        as={TextField}
        variant="outlined"
        type="number"
        inputProps={{ min: 0, max: 2 }}
        fullWidth
        label={t('YELLOW_CARDS')}
        error={touched.yellowCards && !!errors.yellowCards}
        helperText={touched.yellowCards && errors.yellowCards}
      />
      <Field
        name="redCards"
        as={TextField}
        variant="outlined"
        type="number"
        inputProps={{ min: 0, max: 1 }}
        fullWidth
        label={t('RED_CARDS')}
        error={touched.redCards && !!errors.redCards}
        helperText={touched.redCards && errors.redCards}
      />
    </Box>
  )
}

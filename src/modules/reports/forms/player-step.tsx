import { Box, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'

import { CreateReportDto } from '../types'

interface IPlayerStepProps {
  playersData: PlayerBasicDataDto[]
}

export const PlayerStep = ({ playersData }: IPlayerStepProps) => {
  const { t } = useTranslation()
  const { touched, errors } = useFormikContext<CreateReportDto>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <PlayersCombo
        data={playersData}
        name="playerId"
        label={t('PLAYER')}
        error={touched.playerId && !!errors.playerId}
        helperText={touched.playerId ? errors.playerId : undefined}
      />
      <Field
        name="shirtNo"
        as={TextField}
        type="number"
        inputProps={{ min: 1, max: 99 }}
        variant="outlined"
        fullWidth
        label={t('SHIRT_NO')}
        error={touched.shirtNo && !!errors.shirtNo}
        helperText={touched.shirtNo && errors.shirtNo}
      />
    </Box>
  )
}

import { Box, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Loader } from '@/components/loader/loader'
import { useUser } from '@/modules/auth/hooks'
import { PlayersCombo } from '@/modules/players/combo'
import { usePlayersList } from '@/modules/players/hooks'

import { CreateReportDto } from '../../types'

export const OrderStep = () => {
  const { t } = useTranslation()
  const { touched, errors } = useFormikContext<CreateReportDto>()

  const { data: user, isLoading: userLoading } = useUser()

  const { data: players, isLoading: playersLoading } = usePlayersList()

  const isLoading = playersLoading || userLoading

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isLoading && <Loader />}
      <PlayersCombo
        data={players || []}
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

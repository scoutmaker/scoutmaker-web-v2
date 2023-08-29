import { Box, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'

import { CreateReportDto } from '../../types'

interface IPlayerStepProps {
  playersData: PlayerBasicDataDto[]
  positionsData: PlayerPositionDto[]
}

export const PlayerStep = ({
  playersData,
  positionsData,
}: IPlayerStepProps) => {
  const { t } = useTranslation()
  const { touched, errors } = useFormikContext<CreateReportDto>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <BasicCombo
        data={mapPlayersListToComboOptions(playersData)}
        name="playerId"
        label={t('PLAYER')}
        error={touched.playerId && !!errors.playerId}
        helperText={touched.playerId ? errors.playerId : undefined}
        filterBeforeComma
      />
      <BasicCombo
        data={mapListDataToComboOptions(positionsData)}
        name="positionPlayedId"
        label={t('reports:POSITION_PLAYED')}
        error={touched.positionPlayedId && !!errors.positionPlayedId}
        helperText={
          (touched.positionPlayedId && errors.positionPlayedId) ||
          t('reports:PLAYER_POSITION_INFO')
        }
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

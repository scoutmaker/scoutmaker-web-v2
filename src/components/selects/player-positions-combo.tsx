import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { PlayerPositionDto } from '@/types/player-positions'

import { IComboProps } from './types'

interface IPlayersPositionComboProps extends IComboProps<PlayerPositionDto> {}

export const PlayersPositionCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IPlayersPositionComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(position => position.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') {
          return ''
        }
        const position = data.find(p => p.id === option)
        if (position) {
          return position.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('PRIMARY_POSITION')}
          placeholder={label || t('PRIMARY_POSITION')}
        />
      )}
    />
  )
}

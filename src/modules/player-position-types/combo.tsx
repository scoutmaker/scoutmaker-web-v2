import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { PlayerPositionTypeDto } from './types'

interface IPlayersPositionTypesComboProps
  extends IComboProps<PlayerPositionTypeDto> {}

export const PlayersPositionTypeCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IPlayersPositionTypesComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(type => type.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') {
          return ''
        }
        const type = data.find(p => p.id === option)
        if (type) {
          return type.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('POSITION_TYPE')}
          placeholder={label || t('POSITION_TYPE')}
        />
      )}
    />
  )
}

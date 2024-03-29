import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { PlayerBasicDataDto } from './types'

interface IPlayersComboProps extends IComboProps<PlayerBasicDataDto> {}

export const PlayersCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IPlayersComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(player => player.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') {
          return ''
        }
        const player = data.find(c => c.id === option)
        if (player) {
          return `${player.firstName} ${player.lastName}, ${player.primaryPosition.name} (${player.teams[0]?.team.name})`
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('PLAYER')}
          placeholder={label || t('PLAYER')}
        />
      )}
    />
  )
}

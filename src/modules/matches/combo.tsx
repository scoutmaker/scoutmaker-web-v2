import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { MatchBasicDataDto } from './types'

interface IMatchesComboProps extends IComboProps<MatchBasicDataDto> {
  disabled?: boolean
}

export const MatchesCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
  disabled,
}: IMatchesComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      disabled={disabled}
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(match => match.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') {
          return ''
        }
        const match = data.find(c => c.id === option)
        if (match) {
          return `${match.homeTeam.name} vs. ${match.awayTeam.name} (${match.competition.name})`
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('MATCH')}
          placeholder={label || t('MATCH')}
        />
      )}
    />
  )
}

import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { SeasonDto } from './types'

interface ISeasonsComboProps extends IComboProps<SeasonDto> {}

export const SeasonsCombo = ({
  data,
  name,
  label,
  size,
  multiple,
  error,
  helperText,
}: ISeasonsComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(role => role.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) {
          return ''
        }
        const season = data.find(s => s.id === option)
        if (season) {
          return season.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('SEASON')}
          placeholder={label || t('SEASON')}
        />
      )}
    />
  )
}

import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '../../types/combo'

export const GendersCombo = ({
  name,
  label,
  multiple,
  error,
  helperText,
  size,
}: Omit<IComboProps<{}>, 'data'>) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['MALE', 'FEMALE']}
      getOptionLabel={(option: string) => {
        if (option === 'MALE') return t('MALE')
        return t('FEMALE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('GENDERS')}
          placeholder={label || t('GENDERS')}
        />
      )}
    />
  )
}

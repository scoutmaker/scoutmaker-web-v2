import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { IComboOptions } from './types'

interface IBasicComboProps extends IComboProps<IComboOptions> {}

export const BasicCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IBasicComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(el => el.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') return ''
        return data.find(el => el.id === option)?.label || t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label}
          placeholder={label}
        />
      )}
    />
  )
}

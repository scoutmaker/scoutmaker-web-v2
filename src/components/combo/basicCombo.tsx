import { AutocompleteRenderInputParams, Box, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboOptions } from './types'

interface IBasicComboProps {
  data: IComboOptions[]
  name: string
  label: string
  multiple?: boolean
  size?: 'medium' | 'small'
  error?: boolean
  helperText?: string
  disabled?: boolean
}

export const BasicCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
  disabled,
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
      disabled={disabled}
      renderOption={(props: any, option: string) => {
        if (option === '') return ''
        const optionLabel =
          data.find(el => el.id === option)?.label || t('NONE')
        return (
          <Box component="li" {...props} key={option}>
            {optionLabel}
          </Box>
        )
      }}
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

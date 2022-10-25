import {
  AutocompleteRenderInputParams,
  Box,
  createFilterOptions,
  TextField,
} from '@mui/material'
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
  filterBeforeComma?: boolean
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
  filterBeforeComma,
}: IBasicComboProps) => {
  const { t } = useTranslation()
  const filterOptions = createFilterOptions({
    stringify: (option: string) =>
      data.find(e => e.id === option)?.label.split(', ')[0] || '',
  })
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
      filterOptions={filterBeforeComma ? filterOptions : undefined}
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

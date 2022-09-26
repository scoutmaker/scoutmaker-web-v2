import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'

import { IComboOptions } from './types'

interface IComboProps {
  data: IComboOptions[]
  name: string
  label: string
  multiple?: boolean
  size?: 'medium' | 'small'
  error?: boolean
  helperText?: string
}

export const Combo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IComboProps) => (
  <Field
    name={name}
    component={Autocomplete}
    limitTags={3}
    multiple={multiple}
    id={name}
    size={size}
    options={data}
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

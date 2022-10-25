import {
  AutocompleteRenderInputParams,
  Box,
  createFilterOptions,
  TextField,
} from '@mui/material'
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
  filterBeforeComma?: boolean
}

const filterOptions = createFilterOptions({
  stringify: (option: IComboOptions) => option.label.split(', ')[0],
})

export const FilterCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
  filterBeforeComma,
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
    filterOptions={filterBeforeComma ? filterOptions : undefined}
    isOptionEqualToValue={(option: IComboOptions, value: IComboOptions) =>
      option.id === value.id
    }
    renderOption={(props: any, option: IComboOptions) => (
      <Box component="li" {...props} key={option.id}>
        {option.label}
      </Box>
    )}
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

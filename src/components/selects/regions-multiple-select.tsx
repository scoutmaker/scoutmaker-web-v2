import { Field } from 'formik'
import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { RegionDto } from '@/types/regions'

interface IRegionsMultipleSelectProps {
  data: RegionDto[]
  name: string
  label?: string
}

export const RegionsMultipleSelect = ({
  data,
  name,
  label,
}: IRegionsMultipleSelectProps) => (
  <Field
    name={name}
    component={Autocomplete}
    multiple
    id={name}
    options={data.map(country => country.id)}
    getOptionLabel={(option: string) => {
      const region = data.find(r => r.id === option)
      if (region) {
        return region.name
      }
      return 'nieznany region'
    }}
    filterSelectedOptions
    renderInput={(params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label || 'regions'}
        placeholder={label || 'regions'}
      />
    )}
  />
)

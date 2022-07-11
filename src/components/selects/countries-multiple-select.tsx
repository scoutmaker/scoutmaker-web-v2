import { Field } from 'formik'
import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { CountryDto } from '@/types/countries'

interface ICountriesMultipleSelectProps {
  data: CountryDto[]
  name: string
  label?: string
}

export const CountriesMultipleSelect = ({
  data,
  name,
  label,
}: ICountriesMultipleSelectProps) => (
  <Field
    name={name}
    component={Autocomplete}
    multiple
    id={name}
    options={data.map(country => country.id)}
    getOptionLabel={(option: string) => {
      const country = data.find(c => c.id === option)
      if (country) {
        return country.name
      }
      return 'nieznany kraj'
    }}
    filterSelectedOptions
    renderInput={(params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label || 'countries'}
        placeholder={label || 'countries'}
      />
    )}
  />
)

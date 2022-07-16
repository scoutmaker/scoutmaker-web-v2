import { Field } from 'formik'
import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { CountryDto } from '@/types/countries'
import { useTranslation } from 'next-i18next'
import { IComboProps } from './types'

interface ICountriesComboProps extends IComboProps<CountryDto> {}

export const CountriesCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: ICountriesComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={data.map(country => country.id)}
      getOptionLabel={(option: string) => {
        const country = data.find(c => c.id === option)
        if (country) {
          return country.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('COUNTRIES')}
          placeholder={label || t('COUNTRIES')}
        />
      )}
    />
  )
}

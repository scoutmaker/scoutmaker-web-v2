import { useField } from 'formik'
import { TextField, Autocomplete } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { CountryDto } from '../../types/countries'

interface ICountriesComboProps {
  data: CountryDto[]
  name: string
  label?: string
  size?: 'medium' | 'small'
}

export const CountriesCombo = ({
  data,
  name,
  label,
  size,
}: ICountriesComboProps) => {
  const [field, fieldMeta, fieldHelpers] = useField(name)
  const { t } = useTranslation()

  const { value } = field
  const { error, touched } = fieldMeta
  const { setValue } = fieldHelpers

  return (
    <Autocomplete
      id={name}
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue)
      }}
      value={value}
      options={['', ...data.map(country => country.id)]}
      disableClearable
      getOptionLabel={option => {
        const selected = data.find(country => country.id === option)
        if (selected) {
          return selected.name
        }
        return t('NONE')
      }}
      renderOption={(props, option) => {
        const selected = data.find(country => country.id === option)
        return (
          <li {...props} key={option.id}>
            {selected ? selected.name : t('NONE')}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label || t('COUNTRY')}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
      size={size}
    />
  )
}

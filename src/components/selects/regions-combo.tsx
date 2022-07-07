import { useField } from 'formik'
import { TextField, Autocomplete } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { RegionDto } from '../../types/regions'

interface IRegionsComboProps {
  data: RegionDto[]
  name: string
  label?: string
  size?: 'medium' | 'small'
}

export const RegionsCombo = ({
  data,
  name,
  label,
  size,
}: IRegionsComboProps) => {
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
      options={['', ...data.map(region => region.id)]}
      disableClearable
      getOptionLabel={option => {
        const selected = data.find(region => region.id === option)
        if (selected) {
          return `${selected.name} (${selected.country.name})`
        }
        return 'brak'
      }}
      renderOption={(props, option) => {
        const selected = data.find(region => region.id === option)
        return (
          <li {...props} key={option.id}>
            {selected
              ? `${selected?.name} (${selected?.country.name})`
              : 'brak'}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label || t('REGION')}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
      size={size}
    />
  )
}

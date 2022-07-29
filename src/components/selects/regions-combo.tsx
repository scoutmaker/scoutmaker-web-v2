import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { RegionDto } from '@/modules/regions/types'

import { IComboProps } from './types'

interface IRegionsComboProps extends IComboProps<RegionDto> {}

export const RegionsCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IRegionsComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(country => country.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) {
          return ''
        }
        const region = data.find(r => r.id === option)
        if (region) {
          return region.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('REGIONS')}
          placeholder={label || t('REGIONS')}
        />
      )}
    />
  )
}

import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { OrganizationBasicDataDto } from './types'

interface IOrganizationsComboProps extends IComboProps<OrganizationBasicDataDto> { }

export const OrganizationsCombo = ({
  data,
  name,
  label,
  size,
  multiple,
  error,
  helperText,
}: IOrganizationsComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(o => o.id)]}
      getOptionLabel={(option: string) => {
        if (!option)
          return ''

        const organization = data.find(s => s.id === option)
        if (organization)
          return organization.name

        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('ORGANIZATION')}
          placeholder={label || t('ORGANIZATION')}
        />
      )}
    />
  )
}

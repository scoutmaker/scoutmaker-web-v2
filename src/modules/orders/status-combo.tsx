import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '../../types/combo'

export const StatusCombo = ({
  name,
  label,
  multiple,
  error,
  helperText,
  size,
}: Omit<IComboProps<{}>, 'data'>) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['OPEN', 'ACCEPTED', 'CLOSED']}
      getOptionLabel={(option: string) => t(`orders:${option}`)} // ADD_TRANS
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('STATUS')} // ADD_TRANS
          placeholder={label || t('STATUS')} // ADD_TRANS
        />
      )}
    />
  )
}
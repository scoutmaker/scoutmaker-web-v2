import { MenuItem } from '@mui/material'
import { Field } from 'formik'
import { Select } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '../../types/combo'

export const StatusSelect = ({
  name,
  label,
  error,
  helperText,
  size,
}: Omit<IComboProps<{}>, 'data'>) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Select}
      label={label}
      id={name}
      size={size}
      error={error}
      helperText={helperText}
    >
      <MenuItem value="" />
      <MenuItem value="OPEN">{t('OPEN')}</MenuItem>
      <MenuItem value="ACCEPTED">{t('ACCEPTED')}</MenuItem>
      <MenuItem value="CLOSED">{t('CLOSED')}</MenuItem>
    </Field>
  )
}
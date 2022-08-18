import { MenuItem } from '@mui/material'
import { Field } from 'formik'
import { Select } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '../../types/combo'
import { OrderStatusChip } from './StatusChip'

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
      <MenuItem value="" >{t('ALL')}</MenuItem>
      <MenuItem value="OPEN">{t('orders:OPEN')}</MenuItem>
      <MenuItem value="ACCEPTED">{t('orders:ACCEPTED')}</MenuItem>
      <MenuItem value="CLOSED">{t('orders:CLOSED')}</MenuItem>
    </Field>
  )
}
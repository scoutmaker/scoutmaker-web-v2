import { MenuItem } from '@mui/material'
import { Field } from 'formik'
import { Select } from 'formik-mui'

import { IComboProps } from '../../types/combo'
import { OrderStatusChip } from './StatusChip'

export const StatusSelect = ({
  name,
  label,
  error,
  helperText,
  size,
}: Omit<IComboProps<{}>, 'data'>) => (
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
    <MenuItem value="OPEN"><OrderStatusChip status='OPEN' /></MenuItem>
    <MenuItem value="ACCEPTED"><OrderStatusChip status='ACCEPTED' /></MenuItem>
    <MenuItem value="CLOSED"><OrderStatusChip status='CLOSED' /></MenuItem>
  </Field>
)
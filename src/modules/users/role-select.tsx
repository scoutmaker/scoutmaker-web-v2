import { MenuItem } from '@mui/material'
import { Field } from 'formik'
import { Select } from 'formik-mui'
import { useTranslation } from 'next-i18next'

interface IRoleSelectProps {
  name: string
  label?: string
  size?: 'medium' | 'small'
  error?: boolean
  helperText?: string
}

export const RoleSelect = ({
  name,
  label,
  size,
  error,
  helperText,
}: IRoleSelectProps) => {
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
      <MenuItem value="ADMIN">{t('ADMIN')}</MenuItem>
      <MenuItem value="PLAYMAKER_SCOUT">{t('PLAYMAKER_SCOUT')}</MenuItem>
      <MenuItem value="SCOUT">{t('SCOUT')}</MenuItem>
    </Field>
  )
}

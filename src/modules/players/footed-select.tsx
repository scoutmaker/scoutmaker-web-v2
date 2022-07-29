import { MenuItem } from '@mui/material'
import { Field } from 'formik'
import { Select } from 'formik-mui'
import { useTranslation } from 'next-i18next'

interface IFootedSelectProps {
  name: string
  label?: string
  size?: 'medium' | 'small'
  error?: boolean
  helperText?: string
}

export const FootedSelect = ({
  name,
  label,
  size,
  error,
  helperText,
}: IFootedSelectProps) => {
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
      <MenuItem value="LEFT">{t('LEFT')}</MenuItem>
      <MenuItem value="RIGHT">{t('RIGHT')}</MenuItem>
      <MenuItem value="BOTH">{t('BOTH')}</MenuItem>
    </Field>
  )
}

import { MenuItem } from '@mui/material'
import { Field } from 'formik'
import { Select } from 'formik-mui'
import { TFunction, useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { RatingRange } from '../../modules/reports/types'

function getOptions(
  t: TFunction,
): Array<{ value: RatingRange; label: string }> {
  return [
    { value: 'ALL', label: t('ALL') },
    { value: 'NEGATIVE_SELECTION', label: t('NEGATIVE_SELECTION') },
    { value: 'NO_DECISION', label: t('NO_DECISION') },
    { value: 'TO_OBSERVE', label: t('TO_OBSERVE') },
    { value: 'POSITIVE_SELECTION', label: t('POSITIVE_SELECTION') },
  ]
}

interface IRatingRangeSelectProps {
  name: string
  label?: string
  size?: 'medium' | 'small'
  error?: boolean
  helperText?: string
}

export const RatingRangeSelect = ({
  name,
  label,
  size,
  error,
  helperText,
}: IRatingRangeSelectProps) => {
  const { t } = useTranslation()

  const options = useMemo(() => getOptions(t), [t])

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
      {options.map(({ label: optionLabel, value }) => (
        <MenuItem key={value} value={value}>
          {optionLabel}
        </MenuItem>
      ))}
    </Field>
  )
}

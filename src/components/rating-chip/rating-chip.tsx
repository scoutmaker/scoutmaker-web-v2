import { Chip } from '@mui/material'
import { TFunction, useTranslation } from 'next-i18next'
import React from 'react'

interface IRatingChipProps {
  rating: number
  printeable?: boolean
}

function getRatingOptions(
  rating: number,
  t: TFunction,
): { label: string; color: 'secondary' | 'primary' | 'info' | 'success' } {
  switch (rating) {
    case 1:
      return { label: t('NEGATIVE_SELECTION'), color: 'secondary' }
    case 2:
      return { label: t('NO_DECISION'), color: 'primary' }
    case 3:
      return { label: t('TO_OBSERVE'), color: 'info' }
    default:
      return { label: t('POSITIVE_SELECTION'), color: 'success' }
  }
}

export const RatingChip = ({ rating, printeable }: IRatingChipProps) => {
  const { t } = useTranslation()
  const options = getRatingOptions(rating, t)

  return (
    <Chip
      size="small"
      label={options.label}
      color={options.color}
      sx={{ fontWeight: 'bold', fontSize: printeable ? 10 : undefined }}
    />
  )
}

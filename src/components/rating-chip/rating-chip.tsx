import { Chip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface IRatingChipProps {
  rating: number
  printeable?: boolean
}

function getRatingOptions(rating: number): {
  labelKey: string
  color: 'secondary' | 'primary' | 'info' | 'success'
} {
  switch (rating) {
    case 1:
      return { labelKey: 'NEGATIVE_SELECTION', color: 'secondary' }
    case 2:
      return { labelKey: 'NO_DECISION', color: 'primary' }
    case 3:
      return { labelKey: 'TO_OBSERVE', color: 'info' }
    default:
      return { labelKey: 'POSITIVE_SELECTION', color: 'success' }
  }
}

export const RatingChip = ({ rating, printeable }: IRatingChipProps) => {
  const { t } = useTranslation()
  const options = getRatingOptions(rating)

  return (
    <Chip
      size="small"
      label={t(options.labelKey)}
      color={options.color}
      sx={{ fontWeight: 'bold', fontSize: printeable ? 10 : undefined }}
    />
  )
}

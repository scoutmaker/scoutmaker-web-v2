import { Chip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { ReportStatus } from './types'

interface IStatusChipProps {
  status: ReportStatus
}

export const StatusChip = ({ status }: IStatusChipProps) => {
  const { t } = useTranslation()

  return (
    <Chip
      size="small"
      label={t(status)}
      color={status === 'FINISHED' ? 'success' : 'info'}
      sx={{ fontWeight: 'bold' }}
    />
  )
}

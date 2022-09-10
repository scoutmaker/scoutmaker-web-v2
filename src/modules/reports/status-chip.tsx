import { Chip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { ReportStatus } from './types'

interface IStatusChipProps {
  status: ReportStatus
}

export const StatusChip = ({ status }: IStatusChipProps) => {
  const { t } = useTranslation(['common', 'reports'])

  return (
    <Chip
      size="small"
      label={t(`reports:${status}`)}
      color={status === 'FINISHED' ? 'success' : 'info'}
      sx={{ fontWeight: 'bold' }}
    />
  )
}

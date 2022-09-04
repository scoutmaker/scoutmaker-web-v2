import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ReportType } from '../../types'

interface IReportTypeStepProps {
  reportType: ReportType
  setReportType: (value: ReportType) => void
  isOrderOptionDisabled?: boolean
  isPlayerOptionDisabled?: boolean
}

export const ReportTypeStep = ({
  reportType,
  setReportType,
  isOrderOptionDisabled,
  isPlayerOptionDisabled,
}: IReportTypeStepProps) => {
  const { t } = useTranslation()

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="reportType">{t('reports:TYPE')}</InputLabel>
      <Select
        labelId="reportType"
        id="reportType"
        value={reportType}
        onChange={e => setReportType(e.target.value as ReportType)}
        label={t('reports:TYPE')}
      >
        <MenuItem value="custom" disabled={isPlayerOptionDisabled}>
          {t('reports:TYPE_CUSTOM')}
        </MenuItem>
        <MenuItem value="order" disabled={isOrderOptionDisabled}>
          {t('reports:TYPE_ORDER')}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

import { Box } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { ReportTemplatesCombo } from '@/modules/report-templates/combo'
import { ReportTemplateBasicDataDto } from '@/modules/report-templates/types'

import { CreateReportDto } from '../../types'

interface ITemplateStepProps {
  templatesData: ReportTemplateBasicDataDto[]
}

export const TemplateStep = ({ templatesData }: ITemplateStepProps) => {
  const { t } = useTranslation()
  const { touched, errors } = useFormikContext<CreateReportDto>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ReportTemplatesCombo
        data={templatesData}
        name="templateId"
        label={t('REPORT_TEMPLATES')}
        error={touched.templateId && !!errors.templateId}
        helperText={touched.templateId ? errors.templateId : undefined}
      />
    </Box>
  )
}

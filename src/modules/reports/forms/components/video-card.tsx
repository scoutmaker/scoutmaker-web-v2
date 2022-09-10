import { Card, CardContent, CardHeader, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { CreateReportDto } from '../../types'

export const VideoCard = () => {
  const { t } = useTranslation(['common', 'reports'])
  const { touched, errors } = useFormikContext<CreateReportDto>()

  return (
    <Card>
      <CardHeader title={t('reports:EDIT_VIDEO_CARD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Field
          name="videoUrl"
          as={TextField}
          variant="outlined"
          fullWidth
          label={t('VIDEO_URL')}
          error={touched.videoUrl && !!errors.videoUrl}
          helperText={touched.videoUrl && errors.videoUrl}
        />
        <Field
          name="videoDescription"
          as={TextField}
          variant="outlined"
          fullWidth
          label={t('VIDEO_DESCRIPTION')}
          error={touched.videoDescription && !!errors.videoDescription}
          helperText={touched.videoDescription && errors.videoDescription}
        />
      </CardContent>
    </Card>
  )
}

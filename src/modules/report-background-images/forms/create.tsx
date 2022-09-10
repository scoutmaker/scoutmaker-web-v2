import { Box, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'

import { CreateReportBgImageDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateReportBgImageDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateReportBgImageForm = ({
  onSubmit,
  onCancelClick,
  fullwidth
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateReportBgImageDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <Field
              name="url"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('URL')}
              error={touched.url && !!errors.url}
              helperText={touched.url && errors.url}
            />
            <Box display='flex' justifyContent='center'>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isPublic"
                Label={{ label: t('report-bg-images:IS_PUBLIC') }}
              />
            </Box>
            <MainFormActions
              label={t('REPORT_BACKGROUND_IMAGE')}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: t('CHANGES_CANCELLED'), type: 'warning' })
              }}
            />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

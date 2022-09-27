import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'

import { CreateSeasonDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateSeasonDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateSeasonForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
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
        onSubmit(dataToSubmit as CreateSeasonDto)
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
              name="startDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('seasons:START_DATE')}
              error={touched.startDate && !!errors.startDate}
              helperText={touched.startDate && errors.startDate}
            />
            <Field
              name="endDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('seasons:END_DATE')}
              error={touched.endDate && !!errors.endDate}
              helperText={touched.endDate && errors.endDate}
            />
            <MainFormActions
              label={t('SEASON')}
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

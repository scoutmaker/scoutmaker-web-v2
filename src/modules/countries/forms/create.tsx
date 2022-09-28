import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'

import { CreateCountryDto } from '../types'
import { generateCreateCountryValidationSchema, initialValues } from './utils'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

interface ICreateCountryFormProps {
  onSubmit: (data: CreateCountryDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateCountryForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
}: ICreateCountryFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateCountryValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateCountryDto)
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
              name="code"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('countries:CODE')}
              error={touched.code && !!errors.code}
              helperText={touched.code && errors.code}
            />
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isEuMember"
                Label={{ label: t('countries:IS_EU_MEMBER') }}
              />
            </StyledCheckboxContainer>
            <MainFormActions
              label={t('COUNTRY')}
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

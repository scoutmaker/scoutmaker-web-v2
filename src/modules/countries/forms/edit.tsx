import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { updatedDiff } from 'deep-object-diff'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'

import { CountryDto, UpdateCountryDto } from '../types'
import {
  generateUpdateCountryValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

interface IEditCountryFormProps {
  current: CountryDto
  onSubmit: (data: UpdateCountryDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditCountryForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
}: IEditCountryFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateCountryValidationSchema()}
      enableReinitialize
      onSubmit={data => {
        const dataToSubmit = updatedDiff(
          initialValues,
          filter(data, (_, value) => value),
        )
        onSubmit(dataToSubmit)
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
              isEditState
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

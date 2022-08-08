import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'

import { CreateRegionDto } from '../types'
import { generateCreateRegionValidationSchema, initialValues } from './utils'

interface ICreateRegionFormProps {
  countriesData: CountryDto[]
  onSubmit: (data: CreateRegionDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateRegionForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  countriesData
}: ICreateRegionFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateRegionValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateRegionDto)
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
            <CountriesCombo
              data={countriesData}
              name="countryId"
              label={t('COUNTRY')}
              error={touched.countryId && !!errors.countryId}
              helperText={touched.countryId ? errors.countryId : undefined}
            />
            <MainFormActions
              label={t('REGION')}
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

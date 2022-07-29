import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CreateClubDto } from '@/modules/clubs/types'
import { CountryDto } from '@/modules/countries/types'
import { RegionDto } from '@/modules/regions/types'

import { Container } from '../container'
import { MainFormActions } from '../main-form-actions'
import { Fields } from './fields'
import { generateCreateClubValidationSchema, initialValues } from './utils'

interface ICreateClubFormProps {
  regionsData: RegionDto[]
  countriesData: CountryDto[]
  onSubmit: (data: CreateClubDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateClubForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  regionsData,
  countriesData,
}: ICreateClubFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateClubValidationSchema(t)}
      enableReinitialize
      onSubmit={async (data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateClubDto)
        resetForm()
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Fields countriesData={countriesData} regionsData={regionsData} />
            <MainFormActions
              label={t('CLUB')}
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

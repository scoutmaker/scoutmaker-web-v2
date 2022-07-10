import { Formik, Form } from 'formik'
import { useTranslation } from 'next-i18next'
import filter from 'just-filter-object'
import { useAlertsState } from '../../../context/alerts/useAlertsState'
import { CreateClubDto } from '../../../types/clubs'
import { generateCreateClubValidationSchema, initialValues } from './utils'
import { Container } from '../container'
import { Fields } from './fields'
import { CountryDto } from '../../../types/countries'
import { RegionDto } from '../../../types/regions'
import { MainFormActions } from '../main-form-actions'

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
              label="klub"
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' })
              }}
            />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
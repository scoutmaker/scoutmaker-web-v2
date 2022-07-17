import { Formik, Form } from 'formik'
import { useTranslation } from 'next-i18next'
import filter from 'just-filter-object'
import { updatedDiff } from 'deep-object-diff'
import { useAlertsState } from '../../../context/alerts/useAlertsState'
import { ClubDto, UpdateClubDto } from '../../../types/clubs'
import {
  generateUpdateClubValidationSchema,
  getInitialStateFromCurrent,
} from './utils'
import { Container } from '../container'
import { Fields } from './fields'
import { CountryDto } from '../../../types/countries'
import { RegionDto } from '../../../types/regions'
import { MainFormActions } from '../main-form-actions'

interface IEditClubFormProps {
  current: ClubDto
  regionsData: RegionDto[]
  countriesData: CountryDto[]
  onSubmit: (data: UpdateClubDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditClubForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  regionsData,
  countriesData,
}: IEditClubFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateClubValidationSchema()}
      enableReinitialize
      onSubmit={data => {
        const dataToSubmit = updatedDiff(
          initialValues,
          filter(data, (_, value) => value),
        )
        onSubmit(dataToSubmit)
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Fields countriesData={countriesData} regionsData={regionsData} />
            <MainFormActions
              label={t('CLUB')}
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

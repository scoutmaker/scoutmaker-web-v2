import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ClubDto, UpdateClubDto } from '@/modules/clubs/types'
import { CountryDto } from '@/modules/countries/types'
import { RegionDto } from '@/modules/regions/types'

import { Fields } from './fields'
import {
  generateUpdateClubValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

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

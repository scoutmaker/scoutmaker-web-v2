import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { CreatePlayerDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { Container } from '../container'
import { MainFormActions } from '../main-form-actions'
import { Fields } from './fields'
import { generateCreatePlayerValidationSchema, initialValues } from './utils'

interface ICreatePlayerFormProps {
  positionsData: PlayerPositionDto[]
  countriesData: CountryDto[]
  teamsData: TeamBasicDataDto[]
  onSubmit: (data: CreatePlayerDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreatePlayerForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  positionsData,
  teamsData,
  countriesData,
}: ICreatePlayerFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreatePlayerValidationSchema(t)}
      enableReinitialize
      onSubmit={async (data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreatePlayerDto)
        resetForm()
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Fields
              countriesData={countriesData}
              positionsData={positionsData}
              teamsData={teamsData}
            />
            <MainFormActions
              label={t('PLAYER')}
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

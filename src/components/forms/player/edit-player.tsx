import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { PlayerDto, UpdatePlayerDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/types/player-positions'

import { Container } from '../container'
import { MainFormActions } from '../main-form-actions'
import { Fields } from './fields'
import {
  generateUpdatePlayerValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface EditPlayerFormProps {
  current: PlayerDto
  positionsData: PlayerPositionDto[]
  countriesData: CountryDto[]
  teamsData: TeamBasicDataDto[]
  onSubmit: (data: UpdatePlayerDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditPlayerForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  positionsData,
  teamsData,
  countriesData,
}: EditPlayerFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateUpdatePlayerValidationSchema(t)}
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
            <Fields
              countriesData={countriesData}
              positionsData={positionsData}
              teamsData={teamsData}
              editForm
            />
            <MainFormActions
              label={t('PLAYER')}
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

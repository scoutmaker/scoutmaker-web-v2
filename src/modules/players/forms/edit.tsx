import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerRoleDto } from '@/modules/player-roles/types'
import { PlayerDto, UpdatePlayerDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

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
  playerRolesData: PlayerRoleDto[]
  onSubmit: (data: UpdatePlayerDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  showRoleField: boolean
}

export const EditPlayerForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  positionsData,
  teamsData,
  countriesData,
  showRoleField,
  playerRolesData,
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
              showRoleField={showRoleField}
              playerRolesData={playerRolesData}
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

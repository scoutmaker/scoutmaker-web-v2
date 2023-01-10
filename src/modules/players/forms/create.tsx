import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerRoleDto } from '@/modules/player-roles/types'
import { CreatePlayerDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { Fields } from './fields'
import { generateCreatePlayerValidationSchema, initialValues } from './utils'

interface ICreatePlayerFormProps {
  positionsData: PlayerPositionDto[]
  countriesData: CountryDto[]
  teamsData: TeamBasicDataDto[]
  playerRolesData: PlayerRoleDto[]
  onSubmit: (data: CreatePlayerDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  showRoleField: boolean
}

export const CreatePlayerForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  positionsData,
  teamsData,
  countriesData,
  showRoleField,
  playerRolesData,
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
              showRoleField={showRoleField}
              playerRolesData={playerRolesData}
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

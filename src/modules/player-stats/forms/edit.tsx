import { TextField } from '@mui/material'
import { updatedDiff } from 'deep-object-diff'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { PlayerStatsDto, UpdatePlayerStatsDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: PlayerStatsDto
  onSubmit: (data: UpdatePlayerStatsDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  teamsData: TeamBasicDataDto[]
}

export const EditPlayerStatsForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  matchesData,
  playersData,
  teamsData,
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateValidationSchema()}
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
            <BasicCombo
              data={mapPlayersListToComboOptions(playersData)}
              name="playerId"
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
              label={t('PLAYER')}
            />
            <BasicCombo
              data={mapMatchesListToComboOptions(matchesData)}
              name="matchId"
              error={touched.matchId && !!errors.matchId}
              helperText={touched.matchId ? errors.matchId : undefined}
              label={t('MATCH')}
            />
            <Field
              name="minutesPlayed"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('MINUTES_PLAYER')}
              type="number"
              inputProps={{ min: 0, max: 120, step: 1 }}
              error={touched.minutesPlayed && !!errors.minutesPlayed}
              helperText={touched.minutesPlayed && errors.minutesPlayed}
            />
            <Field
              name="goals"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('GOALS')}
              type="number"
              inputProps={{ min: 0, step: 1 }}
              error={touched.goals && !!errors.goals}
              helperText={touched.goals && errors.goals}
            />
            <Field
              name="assists"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('ASSISTS')}
              type="number"
              inputProps={{ min: 0, step: 1 }}
              error={touched.assists && !!errors.assists}
              helperText={touched.assists && errors.assists}
            />
            <Field
              name="yellowCards"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('YELLOW_CARDS')}
              type="number"
              inputProps={{ min: 0, max: 2, step: 1 }}
              error={touched.yellowCards && !!errors.yellowCards}
              helperText={touched.yellowCards && errors.yellowCards}
            />
            <Field
              name="redCards"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('RED_CARDS')}
              type="number"
              inputProps={{ min: 0, max: 1, step: 1 }}
              error={touched.redCards && !!errors.redCards}
              helperText={touched.redCards && errors.redCards}
            />
            <BasicCombo
              data={mapListDataToComboOptions(teamsData)}
              name="teamId"
              error={touched.teamId && !!errors.teamId}
              helperText={touched.teamId ? errors.teamId : undefined}
              label={t('TEAM')}
            />
            <MainFormActions
              label={t('PLAYER_STATS')}
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

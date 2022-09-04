import { TextField } from '@mui/material'
import { updatedDiff } from 'deep-object-diff'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { InsiderNoteDto, UpdateInsiderNoteDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: InsiderNoteDto
  onSubmit: (data: UpdateInsiderNoteDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  playersData: PlayerBasicDataDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const EditInsiderNoteForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  playersData,
  teamsData,
  competitionsData,
  competitionGroupsData
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
            <Field
              name="description"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('DESCRIPTION')}
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <Field
              name="informant"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('INFORMANT')}
              error={touched.informant && !!errors.informant}
              helperText={touched.informant && errors.informant}
            />
            <PlayersCombo
              data={playersData}
              name="playerId"
              label={t('PLAYER')}
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
            />
            <TeamsCombo
              data={teamsData}
              name="teamId"
              label={t('TEAM')}
              error={touched.teamId && !!errors.teamId}
              helperText={touched.teamId ? errors.teamId : undefined}
            />
            <CompetitionsCombo
              data={competitionsData}
              name="competitionId"
              label={t('COMPETITION')}
              error={touched.competitionId && !!errors.competitionId}
              helperText={touched.competitionId ? errors.competitionId : undefined}
            />
            <CompetitionGroupsCombo
              data={competitionGroupsData}
              name="competitionGroupId"
              label={t('COMPETITION_GROUP')}
              error={touched.competitionGroupId && !!errors.competitionGroupId}
              helperText={touched.competitionGroupId ? errors.competitionGroupId : undefined}
            />
            <MainFormActions
              label={t('INSIDER_NOTES')}
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

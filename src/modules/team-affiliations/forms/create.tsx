import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CreateTeamAffiliationDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateTeamAffiliationDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  teamsData: TeamBasicDataDto[]
  playersData: PlayerBasicDataDto[]
  playerId?: string
}

export const CreateTeamAffiliationForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  teamsData,
  playersData,
  playerId,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initValues = initialValues
  if (playerId) initValues.playerId = playerId

  return (
    <Formik
      initialValues={initValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateTeamAffiliationDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              name="playerId"
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYER')}
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
              filterBeforeComma
            />
            <BasicCombo
              name="teamId"
              data={mapListDataToComboOptions(teamsData)}
              label={t('TEAM')}
              error={touched.teamId && !!errors.teamId}
              helperText={touched.teamId ? errors.teamId : undefined}
            />
            <Field
              name="startDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('team-affiliations:START_DATE')}
              error={touched.startDate && !!errors.startDate}
              helperText={touched.startDate && errors.startDate}
            />
            <Field
              name="endDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('team-affiliations:END_DATE')}
              error={touched.endDate && !!errors.endDate}
              helperText={touched.endDate && errors.endDate}
              InputLabelProps={{ shrink: true }}
            />
            <MainFormActions
              label={t('TEAM_AFFILIATION')}
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

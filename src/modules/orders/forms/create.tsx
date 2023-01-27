import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { CreateOrderDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateOrderDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  usersData: UserBasicDataDto[]
}

export const CreateOrderForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  playersData,
  matchesData,
  usersData,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateOrderDto)
        resetForm()
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
            <BasicCombo
              data={mapPlayersListToComboOptions(playersData)}
              name="playerId"
              label={t('PLAYER')}
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
              filterBeforeComma
            />
            <BasicCombo
              data={mapMatchesListToComboOptions(matchesData)}
              name="matchId"
              label={t('MATCH')}
              error={touched.matchId && !!errors.matchId}
              helperText={touched.matchId ? errors.matchId : undefined}
            />
            <BasicCombo
              data={mapUsersListToComboOptions(usersData, false)}
              name="scoutId"
              label={t('SCOUT')}
              error={touched.scoutId && !!errors.scoutId}
              helperText={touched.scoutId ? errors.scoutId : undefined}
            />
            <Field
              name="executionDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('orders:EXECUTION_DATE')}
              error={touched.executionDate && !!errors.executionDate}
              helperText={touched.executionDate && errors.executionDate}
              InputLabelProps={{ shrink: true }}
            />
            <MainFormActions
              label={t('ORDER')}
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

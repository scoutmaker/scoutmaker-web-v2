import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { ScoutProfileDto, UpdateScouProfileDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: ScoutProfileDto
  onSubmit: (data: UpdateScouProfileDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  usersData: UserBasicDataDto[]
}

export const EditScoutProfileForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  usersData,
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateValidationSchema()}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              data={mapUsersListToComboOptions(usersData)}
              name="userId"
              label={t('USER')}
              error={touched.userId && !!errors.userId}
              helperText={touched.userId ? errors.userId : undefined}
            />
            <Field
              name="rating"
              as={TextField}
              type="number"
              variant="outlined"
              fullWidth
              label={t('RATING')}
              error={touched.rating && !!errors.rating}
              helperText={touched.rating && errors.rating}
            />
            <Field
              name="description"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('CHARACTERISTIC')}
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <Field
              name="cooperationStartDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('scout-profiles:DATE_JOINED')}
              error={
                touched.cooperationStartDate && !!errors.cooperationStartDate
              }
              helperText={
                touched.cooperationStartDate && errors.cooperationStartDate
              }
            />
            <MainFormActions
              label={t('SCOUT_PROFILE')}
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

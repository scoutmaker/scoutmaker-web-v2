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
import { PlayerPositionTypeDto } from '@/modules/player-position-types/types'

import { PlayerRoleDto, UpdatePlayerRoleDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: PlayerRoleDto
  positionTypesData: PlayerPositionTypeDto[]
  onSubmit: (data: UpdatePlayerRoleDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditPlayerRoleForm = ({
  current,
  positionTypesData,
  onSubmit,
  onCancelClick,
  fullwidth,
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
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <Field
              name="altName"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('ALT_NAME')}
              error={touched.altName && !!errors.altName}
              helperText={touched.altName && errors.altName}
            />
            <BasicCombo
              data={mapListDataToComboOptions(positionTypesData)}
              name="positionTypeId"
              label={t('POSITION_TYPE')}
              error={touched.positionTypeId && !!errors.positionTypeId}
              helperText={
                touched.positionTypeId ? errors.positionTypeId : undefined
              }
            />
            <Field
              name="description"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('DESCRIPTION')}
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <MainFormActions
              label={t('PLAYER_ROLE')}
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

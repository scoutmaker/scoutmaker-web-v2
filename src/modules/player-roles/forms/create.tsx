import { Box, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { PlayerPositionTypeDto } from '@/modules/player-position-types/types'
import { mapPlayerPositionTypesToComboOptions } from '@/modules/player-position-types/utils'

import { CreatePlayerRoleDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreatePlayerRoleDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  positionTypesData: PlayerPositionTypeDto[]
}

export const CreatePlayerRoleForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  positionTypesData,
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
        dataToSubmit.isPublished = data.isPublished
        onSubmit(dataToSubmit as CreatePlayerRoleDto)
        resetForm()
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
              data={mapPlayerPositionTypesToComboOptions(positionTypesData)}
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
            <Box display="flex" justifyContent="center">
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isPublished"
                Label={{ label: t('player-roles:IS_PUBLIC') }}
              />
            </Box>
            <MainFormActions
              label={t('PLAYER_ROLE')}
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

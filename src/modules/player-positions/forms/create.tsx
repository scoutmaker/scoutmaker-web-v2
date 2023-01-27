import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { PlayerPositionTypeDto } from '@/modules/player-position-types/types'

import { CreatePlayerPostitionDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreatePlayerPostitionDto) => void
  positionTypesData: PlayerPositionTypeDto[]
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreatePlayerPositionForm = ({
  onSubmit,
  positionTypesData,
  onCancelClick,
  fullwidth,
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
        onSubmit(dataToSubmit as CreatePlayerPostitionDto)
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
              name="code"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('CODE')}
              error={touched.code && !!errors.code}
              helperText={touched.code && errors.code}
            />
            <BasicCombo
              data={mapListDataToComboOptions(positionTypesData)}
              name="playerPositionTypeId"
              label={t('POSITION_TYPE')}
              error={
                touched.playerPositionTypeId && !!errors.playerPositionTypeId
              }
              helperText={
                touched.playerPositionTypeId
                  ? errors.playerPositionTypeId
                  : undefined
              }
            />
            <Field
              name="listOrder"
              as={TextField}
              variant="outlined"
              type="number"
              fullWidth
              label={t('player-positions:ORDER')}
              error={touched.listOrder && !!errors.listOrder}
              helperText={touched.listOrder && errors.listOrder}
            />
            <MainFormActions
              label={t('POSITION')}
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

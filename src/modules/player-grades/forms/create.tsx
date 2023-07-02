import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'

import { CreatePlayerGradeDto } from '../types'
import { gradesComboOptions } from '../utils'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreatePlayerGradeDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  playersData: PlayerBasicDataDto[]
}

export const CreatePlayerGradeForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  playersData,
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
        onSubmit(dataToSubmit as CreatePlayerGradeDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              data={mapPlayersListToComboOptions(playersData)}
              name="playerId"
              label={t('PLAYER')}
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
            />
            <BasicCombo
              data={gradesComboOptions(t)}
              name="grade"
              label={t('GRADE')}
              error={touched.grade && !!errors.grade}
              helperText={touched.grade ? errors.grade : undefined}
            />
            <MainFormActions
              label={t('PLAYER_GRADE')}
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

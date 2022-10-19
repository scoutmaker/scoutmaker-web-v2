import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { permissionLevelComboData } from '../PermissionLevelComboData'
import { CreateUserPlayerAceDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateUserPlayerAceDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  usersData: UserBasicDataDto[]
  playersData: PlayerBasicDataDto[]
}

export const CreateUserPlayerAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  usersData,
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
        onSubmit(dataToSubmit as CreateUserPlayerAceDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              data={mapUsersListToComboOptions(usersData)}
              name="userId"
              error={touched.userId && !!errors.userId}
              helperText={touched.userId ? errors.userId : undefined}
              label={t('USER')}
            />
            <BasicCombo
              data={mapPlayersListToComboOptions(playersData)}
              name="playerId"
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
              label={t('PLAYER')}
            />
            <BasicCombo
              name="permissionLevel"
              data={permissionLevelComboData}
              label={t('PERMISSION_LEVEL')}
              error={touched.permissionLevel && !!errors.permissionLevel}
              helperText={
                touched.permissionLevel ? errors.permissionLevel : undefined
              }
            />
            <MainFormActions
              label={t('USER_PLAYER_ACL')}
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

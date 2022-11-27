import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { InsiderNoteBasicDataDto } from '@/modules/insider-notes/types'
import { mapInsiderNotesListToComboOptions } from '@/modules/insider-notes/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { CreateUserInsiderNoteAclDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateUserInsiderNoteAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  usersData: UserBasicDataDto[]
  insiderNotesData: InsiderNoteBasicDataDto[]
}

export const CreateUserInsiderNoteAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  usersData,
  insiderNotesData,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()
  const permissionLevelComboData = getPermissionLevelComboData(t)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateUserInsiderNoteAclDto)
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
              data={mapInsiderNotesListToComboOptions(insiderNotesData)}
              name="insiderNoteId"
              error={touched.insiderNoteId && !!errors.insiderNoteId}
              helperText={
                touched.insiderNoteId ? errors.insiderNoteId : undefined
              }
              label={t('INSIDER_NOTE')}
            />
            <BasicCombo
              data={permissionLevelComboData}
              name="permissionLevel"
              error={touched.permissionLevel && !!errors.permissionLevel}
              helperText={
                touched.permissionLevel ? errors.permissionLevel : undefined
              }
              label={t('PERMISSION_LEVEL')}
            />
            <MainFormActions
              label={t('USER_INSIDER_NOTE_ACE')}
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

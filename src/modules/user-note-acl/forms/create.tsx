import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { NoteBasicDataDto } from '@/modules/notes/types'
import { mapNotesListToComboOptions } from '@/modules/notes/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { CreateUserNoteAclDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateUserNoteAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  usersData: UserBasicDataDto[]
  notesData: NoteBasicDataDto[]
}

export const CreateUserNoteAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  usersData,
  notesData,
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
        onSubmit(dataToSubmit as CreateUserNoteAclDto)
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
              data={mapNotesListToComboOptions(notesData)}
              name="noteId"
              error={touched.noteId && !!errors.noteId}
              helperText={touched.noteId ? errors.noteId : undefined}
              label={t('NOTE')}
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
              label={t('USER_NOTE_ACE')}
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

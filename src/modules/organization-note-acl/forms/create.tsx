import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { NoteBasicDataDto } from '@/modules/notes/types'
import { mapNotesListToComboOptions } from '@/modules/notes/utils'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'

import { CreateOrganizationNoteAclDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateOrganizationNoteAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  organizationsData: OrganizationBasicDataDto[]
  notesData: NoteBasicDataDto[]
}

export const CreateOrganizationNoteAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  notesData,
  organizationsData,
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
        onSubmit(dataToSubmit as CreateOrganizationNoteAclDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              data={mapListDataToComboOptions(organizationsData)}
              name="organizationId"
              error={touched.organizationId && !!errors.organizationId}
              helperText={
                touched.organizationId ? errors.organizationId : undefined
              }
              label={t('ORGANIZATION')}
            />
            <BasicCombo
              data={mapNotesListToComboOptions(notesData)}
              name="noteId"
              error={touched.noteId && !!errors.noteId}
              helperText={touched.noteId ? errors.noteId : undefined}
              label={t('NOTE')}
            />
            <BasicCombo
              name="permissionLevel"
              label={t('PERMISSION_LEVEL')}
              error={touched.permissionLevel && !!errors.permissionLevel}
              helperText={
                touched.permissionLevel ? errors.permissionLevel : undefined
              }
              data={permissionLevelComboData}
            />
            <MainFormActions
              label={t('ORGANIZATION_NOTE_ACE')}
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

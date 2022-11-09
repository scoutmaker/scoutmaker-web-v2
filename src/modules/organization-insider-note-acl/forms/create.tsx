import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { InsiderNoteBasicDataDto } from '@/modules/insider-notes/types'
import { mapInsiderNotesListToComboOptions } from '@/modules/insider-notes/utils'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'

import { CreateOrganizationInsiderNoteAclDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateOrganizationInsiderNoteAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  organizationsData: OrganizationBasicDataDto[]
  insiderNotesData: InsiderNoteBasicDataDto[]
}

export const CreateOrganizationInsiderNoteAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  insiderNotesData,
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
        onSubmit(dataToSubmit as CreateOrganizationInsiderNoteAclDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
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
              data={mapListDataToComboOptions(organizationsData)}
              name="organizationId"
              error={touched.organizationId && !!errors.organizationId}
              helperText={
                touched.organizationId ? errors.organizationId : undefined
              }
              label={t('ORGANIZATION')}
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
              label={t('ORGANIZATION_INSIDER_NOTE_ACE')}
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

import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'

import {
  OrganizationReportAclDto,
  UpdateOrganizationReportAclDto,
} from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: OrganizationReportAclDto
  onSubmit: (data: UpdateOrganizationReportAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditOrganizationReportAclForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()
  const permissionLevelComboData = getPermissionLevelComboData(t)

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
            <BasicCombo
              data={permissionLevelComboData}
              label={t('PERMISSION_LEVEL')}
              name="permissionLevel"
              error={touched.permissionLevel && !!errors.permissionLevel}
              helperText={
                touched.permissionLevel ? errors.permissionLevel : undefined
              }
            />
            <MainFormActions
              label={t('ORGANIZATION_REPORT_ACE')}
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

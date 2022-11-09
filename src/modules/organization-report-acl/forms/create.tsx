import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'
import { ReportBasicDataDto } from '@/modules/reports/types'
import { mapReportsListToComboOptions } from '@/modules/reports/utils'

import { CreateOrganizationReportAclDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateOrganizationReportAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  organizationsData: OrganizationBasicDataDto[]
  reportsData: ReportBasicDataDto[]
}

export const CreateOrganizationReportAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  reportsData,
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
        onSubmit(dataToSubmit as CreateOrganizationReportAclDto)
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
              data={mapReportsListToComboOptions(reportsData)}
              name="reportId"
              error={touched.reportId && !!errors.reportId}
              helperText={touched.reportId ? errors.reportId : undefined}
              label={t('REPORT')}
            />
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

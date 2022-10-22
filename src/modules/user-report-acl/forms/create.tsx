import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { getPermissionLevelComboData } from '@/components/acl/PermissionLevelComboData'
import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ReportBasicDataDto } from '@/modules/reports/types'
import { mapReportsListToComboOptions } from '@/modules/reports/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { CreateUserReportAclDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateUserReportAclDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  usersData: UserBasicDataDto[]
  reportsData: ReportBasicDataDto[]
}

export const CreateUserReportAclForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  usersData,
  reportsData,
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
        onSubmit(dataToSubmit as CreateUserReportAclDto)
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
              data={mapReportsListToComboOptions(reportsData)}
              name="reportId"
              error={touched.reportId && !!errors.reportId}
              helperText={touched.reportId ? errors.reportId : undefined}
              label={t('REPORT')}
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
              label={t('USER_REPORT_ACE')}
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

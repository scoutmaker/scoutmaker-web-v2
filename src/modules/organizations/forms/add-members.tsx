import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { UsersCombo } from '@/modules/users/combo'
import { UserBasicDataDto } from '@/modules/users/types'

import { generateAddMembersValidationSchema, initialValues } from './utils'

interface ISubmitData {
  memberIds: string[]
}

interface ICreateFormProps {
  onSubmit: (data: ISubmitData) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  usersData: UserBasicDataDto[]
  filterOutUsers: UserBasicDataDto[]
}

export const AddOrganizationMembersForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  usersData,
  filterOutUsers
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateAddMembersValidationSchema()}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as ISubmitData)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <UsersCombo
              data={usersData}
              name='memberIds'
              multiple
              error={touched.memberIds && !!errors.memberIds}
              helperText={touched.memberIds ? errors.memberIds as string : undefined}
              label={t('USERS')}
              filterOut={filterOutUsers}
            />
            <MainFormActions
              label={t('organizations:ADD_MEMBERS')}
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

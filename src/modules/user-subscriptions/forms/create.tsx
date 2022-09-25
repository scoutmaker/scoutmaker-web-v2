import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { UsersCombo } from '@/modules/users/combo'
import { UserBasicDataDto } from '@/modules/users/types'

import { CreateUserSubscriptionDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateUserSubscriptionDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  usersData: UserBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const CreateUserSubscriptionForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionGroupsData,
  competitionsData,
  usersData
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
        onSubmit(dataToSubmit as CreateUserSubscriptionDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <UsersCombo
              name='userId'
              data={usersData}
              error={touched.userId && !!errors.userId}
              helperText={touched.userId ? errors.userId : undefined}
            />
            <CompetitionsCombo
              name='competitionIds'
              data={competitionsData}
              multiple
              error={touched.competitionIds && !!errors.competitionIds}
              helperText={touched.competitionIds ? errors.competitionIds as string : undefined}
            />
            <CompetitionGroupsCombo
              name='competitionGroupIds'
              data={competitionGroupsData}
              multiple
              error={touched.competitionIds && !!errors.competitionIds}
              helperText={touched.competitionIds ? errors.competitionIds as string : undefined}
            />
            <Field
              name="startDate"
              as={TextField}
              type='date'
              variant="outlined"
              fullWidth
              label={t('user-subs:START_DATE')}
              error={touched.startDate && !!errors.startDate}
              helperText={touched.startDate && errors.startDate}
            />
            <Field
              name="endDate"
              as={TextField}
              type='date'
              variant="outlined"
              fullWidth
              label={t('user-subs:END_DATE')}
              error={touched.endDate && !!errors.endDate}
              helperText={touched.endDate && errors.endDate}
            />

            <MainFormActions
              label={t('USER_SUBSCRIPTION')}
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

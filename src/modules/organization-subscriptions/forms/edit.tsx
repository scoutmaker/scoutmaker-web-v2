import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'

import { OrganizationSubscriptionDto, UpdateOrganizationSubscriptionDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: OrganizationSubscriptionDto
  onSubmit: (data: UpdateOrganizationSubscriptionDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const EditOrganizationSubscriptionForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionGroupsData,
  competitionsData
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateValidationSchema()}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <CompetitionsCombo
              data={competitionsData}
              name='competitionIds'
              multiple
              label={t('COMPETITIONS')}
              error={touched.competitionIds && !!errors.competitionIds}
              helperText={touched.competitionIds ? errors.competitionIds as string : undefined}
            />
            <CompetitionGroupsCombo
              data={competitionGroupsData}
              name='competitionGroupIds'
              multiple
              label={t('COMPETITION_GROUPS')}
              error={touched.competitionGroupIds && !!errors.competitionGroupIds}
              helperText={touched.competitionGroupIds ? errors.competitionGroupIds as string : undefined}
            />
            <Field
              name="startDate"
              as={TextField}
              type='date'
              variant="outlined"
              fullWidth
              label={t('organization-subs:START_DATE')}
              error={touched.startDate && !!errors.startDate}
              helperText={touched.startDate && errors.startDate}
            />
            <Field
              name="endDate"
              as={TextField}
              type='date'
              variant="outlined"
              fullWidth
              label={t('organization-subs:END_DATE')}
              error={touched.endDate && !!errors.endDate}
              helperText={touched.endDate && errors.endDate}
            />
            <MainFormActions
              label={t('ORGANIZATION_SUBSCRIPTION')}
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

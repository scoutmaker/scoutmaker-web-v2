import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'

import { UpdateUserSubscriptionDto, UserSubscriptionDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: UserSubscriptionDto
  onSubmit: (data: UpdateUserSubscriptionDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const EditUserSubscriptionForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionGroupsData,
  competitionsData,
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
      {({ handleReset, touched, errors, values }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              name="competitionIds"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              multiple
              error={touched.competitionIds && !!errors.competitionIds}
              helperText={
                touched.competitionIds
                  ? (errors.competitionIds as string)
                  : undefined
              }
              label={t('COMPETITIONS')}
            />
            <FilteredCompetitonGroups
              competitionGroupsData={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              competitionsFormValue={values.competitionIds || []}
              name="competitionGroupIds"
              multiple
              error={touched.competitionIds && !!errors.competitionIds}
              helperText={
                touched.competitionIds
                  ? (errors.competitionIds as string)
                  : undefined
              }
              label={t('COMPETITION_GROUPS')}
              isBasicCombo
            />
            <Field
              name="startDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('user-subs:START_DATE')}
              error={touched.startDate && !!errors.startDate}
              helperText={touched.startDate && errors.startDate}
            />
            <Field
              name="endDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('user-subs:END_DATE')}
              error={touched.endDate && !!errors.endDate}
              helperText={touched.endDate && errors.endDate}
            />
            <MainFormActions
              label={t('USER_SUBSCRIPTION')}
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

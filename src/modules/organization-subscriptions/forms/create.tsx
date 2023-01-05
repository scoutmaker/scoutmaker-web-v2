import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'

import { CreateOrganizationSubscriptionDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateOrganizationSubscriptionDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  organizationsData: OrganizationBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const CreateOrganizationSubscriptionForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionGroupsData,
  competitionsData,
  organizationsData,
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
        onSubmit(dataToSubmit as CreateOrganizationSubscriptionDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors, values }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <BasicCombo
              label={t('ORGANIZATION')}
              data={mapListDataToComboOptions(organizationsData)}
              name="organizationId"
              error={touched.organizationId && !!errors.organizationId}
              helperText={
                touched.organizationId ? errors.organizationId : undefined
              }
            />
            <BasicCombo
              data={mapCompetitionsListToComboOptions(competitionsData)}
              name="competitionIds"
              multiple
              label={t('COMPETITIONS')}
              error={touched.competitionIds && !!errors.competitionIds}
              helperText={
                touched.competitionIds
                  ? (errors.competitionIds as string)
                  : undefined
              }
            />
            <FilteredCompetitonGroups
              competitionGroupsData={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              competitionsFormValue={values.competitionIds}
              name="competitionGroupIds"
              multiple
              label={t('COMPETITION_GROUPS')}
              error={
                touched.competitionGroupIds && !!errors.competitionGroupIds
              }
              helperText={
                touched.competitionGroupIds
                  ? (errors.competitionGroupIds as string)
                  : undefined
              }
              isBasicCombo
            />
            <Field
              name="startDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('organization-subs:START_DATE')}
              error={touched.startDate && !!errors.startDate}
              helperText={touched.startDate && errors.startDate}
            />
            <Field
              name="endDate"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label={t('organization-subs:END_DATE')}
              error={touched.endDate && !!errors.endDate}
              helperText={touched.endDate && errors.endDate}
            />
            <MainFormActions
              label={t('ORGANIZATION_SUBSCRIPTION')}
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

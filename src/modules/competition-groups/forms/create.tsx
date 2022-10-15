import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { RegionDto } from '@/modules/regions/types'

import { CreateCompetitionGroupDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateCompetitionGroupDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  competitionsData: CompetitionBasicDataDto[]
  regionsData: RegionDto[]
}

export const CreateCompetitionGroupForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionsData,
  regionsData,
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
        onSubmit(dataToSubmit as CreateCompetitionGroupDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <BasicCombo
              data={mapCompetitionsListToComboOptions(competitionsData)}
              name="competitionId"
              label={t('COMPETITION')}
              error={touched.competitionId && !!errors.competitionId}
              helperText={
                touched.competitionId ? errors.competitionId : undefined
              }
            />
            <BasicCombo
              multiple
              data={mapListDataToComboOptions(regionsData)}
              name="regionIds"
              label={t('REGIONS')}
              error={touched.regionIds && !!errors.regionIds}
              helperText={
                touched.regionIds ? (errors.regionIds as string) : undefined
              }
            />
            <MainFormActions
              label={t('COMPETITION_GROUP')}
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

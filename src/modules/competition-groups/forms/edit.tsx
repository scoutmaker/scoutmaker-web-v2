import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { RegionDto } from '@/modules/regions/types'

import { CompetitionGroupDto, UpdateCompetitionGroupDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: CompetitionGroupDto
  onSubmit: (data: UpdateCompetitionGroupDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  competitionsData: CompetitionBasicDataDto[]
  regionsData: RegionDto[]
}

export const EditCompetitionGroupForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionsData,
  regionsData,
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
              data={mapListDataToComboOptions(competitionsData)}
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

import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { RegionsCombo } from '@/modules/regions/combo'
import { RegionDto } from '@/modules/regions/types'
import updatedDiff from '@/utils/updatedDiff'

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
  regionsData
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateValidationSchema()}
      enableReinitialize
      onSubmit={data => onSubmit(updatedDiff(initialValues, data))}
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
            <CompetitionsCombo
              data={competitionsData}
              name='competitionId'
              label={t('COMPETITION')}
              error={touched.competitionId && !!errors.competitionId}
              helperText={touched.competitionId ? errors.competitionId : undefined}
            />
            <RegionsCombo
              multiple
              data={regionsData}
              name='regionIds'
              label={t('REGIONS')}
              error={touched.regionIds && !!errors.regionIds}
              helperText={touched.regionIds ? errors.regionIds as string : undefined}
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

import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { getEditDataToSubmit } from '@/utils/get-edit-data-to-submit'

import {
  ReportSkillAssessmentCategoryDto,
  UpdateReportSkillAssessmentCategoryDto,
} from '../types'
import {
  generateUpdateFormValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: ReportSkillAssessmentCategoryDto
  onSubmit: (data: UpdateReportSkillAssessmentCategoryDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditReportSkillAssessmentCategoryForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateFormValidationSchema()}
      enableReinitialize
      onSubmit={data => {
        onSubmit(getEditDataToSubmit(initialValues, data))
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
            <MainFormActions
              label={t('REPORT_SKILL_ASSESSMENT_CATEGORY')}
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

import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ReportSkillAssessmentTemplatesCombo } from '@/modules/report-skill-assessment-templates/combo'
import { ReportSkillAssessmentTemplateDto } from '@/modules/report-skill-assessment-templates/types'

import { ReportTemplateDto, UpdateReportTemplateDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: ReportTemplateDto
  onSubmit: (data: UpdateReportTemplateDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  skillTemplatesData: ReportSkillAssessmentTemplateDto[]
}

export const EditReportTemplateForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  skillTemplatesData,
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
            <Field
              name="maxRatingScore"
              as={TextField}
              type="number"
              variant="outlined"
              fullWidth
              label={t('MAX_RATING_SCORE')}
              error={touched.maxRatingScore && !!errors.maxRatingScore}
              helperText={touched.maxRatingScore && errors.maxRatingScore}
            />
            <ReportSkillAssessmentTemplatesCombo
              data={skillTemplatesData}
              name="skillAssessmentTemplateIds"
              multiple
              label={t('REPORT_SKILL_ASSESSMENT_TEMPLATES')}
              error={
                touched.skillAssessmentTemplateIds &&
                !!errors.skillAssessmentTemplateIds
              }
              helperText={
                touched.skillAssessmentTemplateIds
                  ? (errors.skillAssessmentTemplateIds as string)
                  : undefined
              }
            />
            <MainFormActions
              label={t('REPORT_TEMPLATE')}
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

import { Box, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ReportSkillAssessmentTemplatesCombo } from '@/modules/report-skill-assessment-templates/combo'
import { ReportSkillAssessmentTemplateDto } from '@/modules/report-skill-assessment-templates/types'

import { CreateReportTemplateDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateReportTemplateDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  skillTemplatesData: ReportSkillAssessmentTemplateDto[]
}

export const CreateReportTemplateForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  skillTemplatesData,
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
        dataToSubmit.isPublic = data.isPublic
        onSubmit(dataToSubmit as CreateReportTemplateDto)
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
            <Box display="flex" justifyContent="center">
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isPublic"
                Label={{ label: t('report-templates:IS_PUBLIC') }}
              />
            </Box>
            <MainFormActions
              label={t('REPORT_TEMPLATE')}
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

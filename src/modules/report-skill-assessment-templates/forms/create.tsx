import { Box, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ReportSkillAssessmentCategoriesCombo } from '@/modules/report-skill-assessment-categories/combo'
import { ReportSkillAssessmentCategoryDto } from '@/modules/report-skill-assessment-categories/types'

import { CreateReportSkillAssessmentTemplateDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateReportSkillAssessmentTemplateDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  categoriesData: ReportSkillAssessmentCategoryDto[]
}

export const CreateReportSkillASsessmentTemplateForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  categoriesData
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
        onSubmit(dataToSubmit as CreateReportSkillAssessmentTemplateDto)
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
              name="shortName"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('SHORT_NAME')}
              error={touched.shortName && !!errors.shortName}
              helperText={touched.shortName && errors.shortName}
            />
            <ReportSkillAssessmentCategoriesCombo
              data={categoriesData}
              name='categoryId'
              label={t('REPORT_SKILL_ASSESSMENT_CATEGORY')}
              error={touched.categoryId && !!errors.categoryId}
              helperText={touched.categoryId ? errors.categoryId : undefined}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="hasScore"
                Label={{ label: t('report-skill-assessment-templates:HAS_SCORE') }}
              />
            </Box>
            <MainFormActions
              label={t('REPORT_SKILL_ASSESSMENT_TEMPLATE')}
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

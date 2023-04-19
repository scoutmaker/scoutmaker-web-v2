import { Box, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ReportSkillAssessmentCategoryDto } from '@/modules/report-skill-assessment-categories/types'
import { ReportSkillAssessmentTemplateDto } from '@/modules/report-skill-assessment-templates/types'
import { mapReportSkillAssessmentTemplatesListToComboOptions } from '@/modules/report-skill-assessment-templates/utils'

import { CreateReportTemplateDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateReportTemplateDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  skillTemplatesData: ReportSkillAssessmentTemplateDto[]
  categoriesData: ReportSkillAssessmentCategoryDto[]
}

export const CreateReportTemplateForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  skillTemplatesData,
  categoriesData,
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
            <BasicCombo
              data={mapReportSkillAssessmentTemplatesListToComboOptions(
                skillTemplatesData,
              )}
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
            <BasicCombo
              data={mapListDataToComboOptions(categoriesData)}
              name="compactCategoriesIds"
              multiple
              label={t('COMPACT_CATEGORIES')}
              error={
                touched.compactCategoriesIds && !!errors.compactCategoriesIds
              }
              helperText={
                touched.compactCategoriesIds
                  ? (errors.compactCategoriesIds as string)
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

import { Box, TextField } from '@mui/material'
import { updatedDiff } from 'deep-object-diff'
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

import {
  ReportSkillAssessmentTemplateDto,
  UpdateReportSkillAssessmentTemplateDto,
} from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: ReportSkillAssessmentTemplateDto
  onSubmit: (data: UpdateReportSkillAssessmentTemplateDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  categoriesData: ReportSkillAssessmentCategoryDto[]
}

export const EditReportSkillAssessmentTemplateForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  categoriesData,
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateValidationSchema()}
      enableReinitialize
      onSubmit={data => {
        const dataToSubmit = updatedDiff(
          initialValues,
          filter(data, (_, value) => value),
        )
        onSubmit(dataToSubmit)
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
            <BasicCombo
              data={mapListDataToComboOptions(categoriesData)}
              name="categoryId"
              label={t('REPORT_SKILL_ASSESSMENT_CATEGORY')}
              error={touched.categoryId && !!errors.categoryId}
              helperText={touched.categoryId ? errors.categoryId : undefined}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="hasScore"
                Label={{
                  label: t('report-skill-assessment-templates:HAS_SCORE'),
                }}
              />
            </Box>
            <MainFormActions
              label={t('REPORT_SKILL_ASSESSMENT_TEMPLATE')}
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

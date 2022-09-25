import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { ReportSkillAssessmentCategoriesCombo } from '@/modules/report-skill-assessment-categories/combo'
import { ReportSkillAssessmentCategoryDto } from '@/modules/report-skill-assessment-categories/types'

import { ReportSkillAssessmentTemplatesFiltersDto } from '../types'

interface IFormProps {
  filters: ReportSkillAssessmentTemplatesFiltersDto
  onFilter: (data: ReportSkillAssessmentTemplatesFiltersDto) => void
  onClearFilters: () => void
  categoriesData: ReportSkillAssessmentCategoryDto[]
}

export const ReportSkillAssessmentTemplatesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  categoriesData,
}: IFormProps) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={filters}
      onSubmit={data => onFilter(data)}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Container>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              size="small"
            />
            <ReportSkillAssessmentCategoriesCombo
              name="categoryIds"
              data={categoriesData}
              multiple
              label={t('CATEGORIES')}
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

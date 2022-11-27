import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { ReportSkillAssessmentCategoryDto } from '@/modules/report-skill-assessment-categories/types'

import { ReportSkillAssessmentTemplatesFiltersState } from '../types'

interface IFormProps {
  filters: ReportSkillAssessmentTemplatesFiltersState
  onFilter: (data: ReportSkillAssessmentTemplatesFiltersState) => void
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
      onSubmit={(data, form) => {
        onFilter(data)
        form.setSubmitting(false)
      }}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <FilterFormContainer>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              size="small"
            />
            <FilterCombo
              name="categoryIds"
              data={mapListDataToComboOptions(categoriesData)}
              multiple
              label={t('CATEGORIES')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'

import { ReportSkillAssessmentCategoriesFiltersDto } from '../types'

type TFilterFormProps = {
  filters: ReportSkillAssessmentCategoriesFiltersDto
  onFilter: (data: ReportSkillAssessmentCategoriesFiltersDto) => void
  onClearFilters: () => void
}

export const ReportSkillAssessmentCategoriesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
}: TFilterFormProps) => {
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
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

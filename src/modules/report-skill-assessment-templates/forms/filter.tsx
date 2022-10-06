import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Combo } from '@/components/combo/combo'
import { mapGenericNameToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
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
            <Combo
              name="categoryIds"
              data={mapGenericNameToComboOptions(categoriesData)}
              multiple
              label={t('CATEGORIES')}
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

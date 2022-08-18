import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'

import { CompetitionAgeCategoriesFiltersDto } from '../types'

type TFilterFormProps = {
  filters: CompetitionAgeCategoriesFiltersDto
  onFilter: (data: CompetitionAgeCategoriesFiltersDto) => void
  onClearFilters: () => void
}

export const CompetitionAgeCategoriesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
}: TFilterFormProps) => {
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
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

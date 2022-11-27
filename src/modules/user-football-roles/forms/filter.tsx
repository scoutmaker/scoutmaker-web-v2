import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'

import { UserFootballRolesFiltersDto } from '../types'

interface IFormProps {
  filters: UserFootballRolesFiltersDto
  onFilter: (data: UserFootballRolesFiltersDto) => void
  onClearFilters: () => void
}

export const UserFootballRolesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
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
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

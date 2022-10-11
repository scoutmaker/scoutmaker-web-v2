import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'

import { PlayerPositionsFiltersDto } from '../types'

interface IFilterFormProps {
  filters: PlayerPositionsFiltersDto
  onFilter: (data: PlayerPositionsFiltersDto) => void
  onClearFilters: () => void
}

export const PlayerPositionsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
}: IFilterFormProps) => {
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
            <Field
              name="code"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('CODE')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

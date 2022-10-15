import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CountriesFiltersDto } from '@/modules/countries/types'

type ICountriesFilterFormProps = {
  filters: CountriesFiltersDto
  onFilter: (data: CountriesFiltersDto) => void
  onClearFilters: () => void
}

export const CountriesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
}: ICountriesFilterFormProps) => {
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
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isEuMember"
                Label={{ label: t('countries:IS_EU_MEMBER') }}
                size="small"
              />
            </FilterCheckboxContainer>
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

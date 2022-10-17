import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CountryDto } from '@/modules/countries/types'
import { mapCountriesListToComboOptions } from '@/modules/countries/utils'
import { RegionsFiltersState } from '@/modules/regions/types'

type IRegionsFilterFormProps = {
  countriesData: CountryDto[]
  filters: RegionsFiltersState
  onFilter: (data: RegionsFiltersState) => void
  onClearFilters: () => void
}

export const RegionsFilterForm = ({
  countriesData,
  filters,
  onFilter,
  onClearFilters,
}: IRegionsFilterFormProps) => {
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
              name="countryId"
              data={mapCountriesListToComboOptions(countriesData)}
              label={t('COUNTRY')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

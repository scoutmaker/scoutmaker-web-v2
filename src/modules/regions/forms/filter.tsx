import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Combo } from '@/components/combo/combo'
import { mapGenericNameToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CountryDto } from '@/modules/countries/types'
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
              name="countryId"
              data={mapGenericNameToComboOptions(countriesData)}
              label={t('COUNTRY')}
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'
import { RegionsFilterDto } from '@/modules/regions/types'

type IRegionsFilterFormProps = {
  countriesData: CountryDto[]
  filters: RegionsFilterDto
  onFilter: (data: RegionsFilterDto) => void
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
            <CountriesCombo
              name="countryId"
              data={countriesData}
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

import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { ClubsFiltersDto } from '@/modules/clubs/types'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'
import { RegionsCombo } from '@/modules/regions/combo'
import { RegionDto } from '@/modules/regions/types'

type IClubsFilterFormProps = {
  regionsData: RegionDto[]
  countriesData: CountryDto[]
  filters: ClubsFiltersDto
  onFilter: (data: ClubsFiltersDto) => void
  onClearFilters: () => void
}

export const ClubsFilterForm = ({
  regionsData,
  countriesData,
  filters,
  onFilter,
  onClearFilters,
}: IClubsFilterFormProps) => {
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
            <RegionsCombo
              name="regionId"
              data={regionsData}
              size="small"
              label={t('REGION')}
            />
            <CountriesCombo
              name="countryId"
              data={countriesData}
              size="small"
              label={t('COUNTRY')}
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { ClubsFiltersState } from '@/modules/clubs/types'
import { CountryDto } from '@/modules/countries/types'
import { RegionDto } from '@/modules/regions/types'

type IClubsFilterFormProps = {
  regionsData: RegionDto[]
  countriesData: CountryDto[]
  filters: ClubsFiltersState
  onFilter: (data: ClubsFiltersState) => void
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
            <FilterCombo
              name="regionId"
              data={mapListDataToComboOptions(regionsData)}
              size="small"
              label={t('REGION')}
            />
            <FilterCombo
              name="countryId"
              data={mapListDataToComboOptions(countriesData)}
              size="small"
              label={t('COUNTRY')}
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

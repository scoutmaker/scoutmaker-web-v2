import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { ClubsFiltersDto } from '@/modules/clubs/types'
import { CountryDto } from '@/types/countries'
import { RegionDto } from '@/types/regions'

import { CountriesCombo } from '../../selects/countries-combo'
import { RegionsCombo } from '../../selects/regions-combo'
import { Container } from '../container'
import { FilterFormActions } from '../filter-form-actions'

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
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

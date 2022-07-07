import { Formik, Form, Field } from 'formik'
import { TextField } from '@mui/material'
import { ClubsFiltersDto } from '../../types/clubs'
import { Container } from './container'
import { RegionsCombo } from '../selects/regions-combo'
import { RegionDto } from '../../types/regions'

type IClubsFilterFormProps = {
  regionsData: RegionDto[]
  // countriesData: CountryDto[]
  filters: ClubsFiltersDto
  onFilter: (data: ClubsFiltersDto) => void
  onClearFilters: () => void
}

export const ClubsFilterForm = ({
  regionsData,
  filters,
  onFilter,
  onClearFilters,
}: IClubsFilterFormProps) => (
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
            label="Nazwa"
            size="small"
          />
          <RegionsCombo
            name="regionId"
            size="small"
            label="region"
            data={regionsData}
          />
          {/* <VoivodeshipSelect name="voivodeship" size="small" />
          <FilterFormActions handleClearFilter={onClearFilters} /> */}
        </Container>
      </Form>
    )}
  </Formik>
)

import { Formik, Form, Field } from 'formik'
import { TextField } from '@mui/material'
import { ClubBasicDataDto, ClubsFiltersDto } from '@/types/clubs'
import { RegionDto } from '@/types/regions'
import { CountryDto } from '@/types/countries'
import { CountriesCombo } from '@/components/selects/countries-combo'
import { useTranslation } from 'next-i18next'
import { RegionsCombo } from '@/components/selects/regions-combo'
import { ClubsCombo } from '@/components/selects/clubs-combo'
import { CompetitionBasicDataDto } from '@/types/competitions'
import { CompetitionsCombo } from '@/components/selects/competitions-combo'
import { CompetitionGroupsCombo } from '@/components/selects/competition-groups-combo'
import { CompetitionGroupBasicDataDto } from '@/types/competition-groups'
import { CheckboxWithLabel } from 'formik-mui'
import { styled } from '@mui/material/styles'
import { Container } from '../container'
import { FilterFormActions } from '../filter-form-actions'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

type ITeamsFilterFormProps = {
  regionsData: RegionDto[]
  countriesData: CountryDto[]
  clubsData: ClubBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  filters: ClubsFiltersDto
  onFilter: (data: ClubsFiltersDto) => void
  onClearFilters: () => void
}

export const TeamsFilterForm = ({
  regionsData,
  countriesData,
  clubsData,
  competitionsData,
  competitionGroupsData,
  filters,
  onFilter,
  onClearFilters,
}: ITeamsFilterFormProps) => {
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
              name="countryIds"
              data={countriesData}
              label={t('COUNTRIES')}
              multiple
            />
            <RegionsCombo
              name="regionIds"
              data={regionsData}
              label={t('REGIONS')}
              multiple
            />
            <ClubsCombo
              data={clubsData}
              name="clubId"
              label={t('CLUB')}
              size="small"
            />
            <CompetitionsCombo
              name="competitionIds"
              data={competitionsData}
              label={t('COMPETITIONS')}
              multiple
            />
            <CompetitionGroupsCombo
              name="competitionGroupIds"
              data={competitionGroupsData}
              label={t('COMPETITION_GROUPS')}
              multiple
            />
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isLiked"
                Label={{ label: 'Tylko polubione' }}
              />
            </StyledCheckboxContainer>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

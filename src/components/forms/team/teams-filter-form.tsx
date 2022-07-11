import { Formik, Form, Field } from 'formik'
import { TextField } from '@mui/material'
import { ClubBasicDataDto, ClubsFiltersDto } from '@/types/clubs'
import { RegionDto } from '@/types/regions'
import { CountryDto } from '@/types/countries'
import { CountriesMultipleSelect } from '@/components/selects/countries-multiple-select'
import { useTranslation } from 'next-i18next'
import { RegionsMultipleSelect } from '@/components/selects/regions-multiple-select'
import { ClubsCombo } from '@/components/selects/clubs-combo'
import { CompetitionBasicDataDto } from '@/types/competitions'
import { CompetitionsMultipleSelect } from '@/components/selects/competitions-multiple-select'
import { CompetitionGroupsMultipleSelect } from '@/components/selects/competition-groups-multiple-select'
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
            <CountriesMultipleSelect
              name="countryIds"
              data={countriesData}
              label={t('COUNTRIES')}
            />
            <RegionsMultipleSelect
              name="regionIds"
              data={regionsData}
              label={t('REGIONS')}
            />
            <ClubsCombo
              clubsData={clubsData}
              name="clubId"
              label={t('CLUB')}
              size="small"
            />
            <CompetitionsMultipleSelect
              name="competitionIds"
              data={competitionsData}
              label={t('COMPETITIONS')}
            />
            <CompetitionGroupsMultipleSelect
              name="competitionGroupIds"
              data={competitionGroupsData}
              label={t('COMPETITION_GROUPS')}
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

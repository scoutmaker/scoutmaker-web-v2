import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { ClubsCombo } from '@/modules/clubs/combo'
import { ClubBasicDataDto, ClubsFiltersDto } from '@/modules/clubs/types'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'
import { RegionsCombo } from '@/modules/regions/combo'
import { RegionDto } from '@/modules/regions/types'

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

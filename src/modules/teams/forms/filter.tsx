import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { ClubBasicDataDto } from '@/modules/clubs/types'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { CountryDto } from '@/modules/countries/types'
import { mapCountriesListToComboOptions } from '@/modules/countries/utils'
import { RegionDto } from '@/modules/regions/types'

import { TeamsFiltersState } from '../types'

type ITeamsFilterFormProps = {
  regionsData: RegionDto[]
  countriesData: CountryDto[]
  clubsData: ClubBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  filters: TeamsFiltersState
  onFilter: (data: TeamsFiltersState) => void
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
              name="countryIds"
              data={mapCountriesListToComboOptions(countriesData)}
              label={t('COUNTRIES')}
              multiple
              size="small"
            />
            <FilterCombo
              name="regionIds"
              data={mapListDataToComboOptions(regionsData)}
              label={t('REGIONS')}
              multiple
              size="small"
            />
            <FilterCombo
              data={mapListDataToComboOptions(clubsData)}
              name="clubId"
              label={t('CLUB')}
              size="small"
            />
            <FilterCombo
              name="competitionIds"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              multiple
              size="small"
            />
            <FilterCombo
              name="competitionGroupIds"
              data={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              label={t('COMPETITION_GROUPS')}
              multiple
              size="small"
            />
          </FilterFormContainer>
          <FilterCheckboxContainer>
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="isLiked"
              Label={{ label: 'Tylko polubione' }}
              size="small"
            />
          </FilterCheckboxContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

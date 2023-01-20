import { Box, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { CountryDto } from '@/modules/countries/types'
import { mapCountriesListToComboOptions } from '@/modules/countries/utils'
import { PlayerPositionTypeDto } from '@/modules/player-position-types/types'
import { mapPlayerPositionTypesToComboOptions } from '@/modules/player-position-types/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { getFootedComboData } from '../footed-select'
import { PlayersFiltersState } from '../types'
import React from 'react'

interface IPlayersFilterFormProps {
  countriesData: CountryDto[]
  positionTypesData: PlayerPositionTypeDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  filters: PlayersFiltersState
  onFilter: (data: PlayersFiltersState) => void
  onClearFilters: () => void
}

export const PlayersFilterForm = ({
  countriesData,
  teamsData,
  positionTypesData,
  competitionsData,
  competitionGroupsData,
  filters,
  onFilter,
  onClearFilters,
}: IPlayersFilterFormProps) => {
  const { t } = useTranslation(['common', 'players'])
  const footedComboData = getFootedComboData(t)
  const groupsComboData = mapCompetitionGroupsListToComboOptions(
    competitionGroupsData,
  )

  return (
    <Formik
      initialValues={filters}
      onSubmit={(data, form) => {
        onFilter(data)
        form.setSubmitting(false)
      }}
      enableReinitialize
    >
      {({ values }) => (
        <Form autoComplete="off">
          <FilterFormContainer>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME_OR_SURNAME')}
              size="small"
            />
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
              <Field
                name="bornAfter"
                as={TextField}
                type="number"
                variant="outlined"
                fullWidth
                label={t('BORN_AFTER')}
                size="small"
                inputProps={{ min: 1980, max: 2020 }}
              />
              <Field
                name="bornBefore"
                as={TextField}
                type="number"
                variant="outlined"
                fullWidth
                label={t('BORN_BEFORE')}
                size="small"
                inputProps={{ min: 1980, max: 2020 }}
              />
            </Box>
            <FilterCombo
              data={footedComboData}
              name="footed"
              label={t('FOOTED')}
              size="small"
            />
            <FilterCombo
              name="countryIds"
              data={mapCountriesListToComboOptions(countriesData)}
              label={t('COUNTRIES')}
              size="small"
              multiple
            />
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
              <Field
                name="minAverageRating"
                as={TextField}
                type="number"
                variant="outlined"
                fullWidth
                label={`Min ${t('AVG_RATING')}`}
                size="small"
                inputProps={{ min: 1, max: 4, step: 0.01 }}
                onInput={averageRatingInRange}
              />
              <Field
                name="maxAverageRating"
                as={TextField}
                type="number"
                variant="outlined"
                fullWidth
                label={`Max ${t('AVG_RATING')}`}
                size="small"
                inputProps={{ min: 1, max: 4, step: 0.01 }}
                onInput={averageRatingInRange}
              />
            </Box>
            <FilterCombo
              name="positionTypeIds"
              data={mapPlayerPositionTypesToComboOptions(positionTypesData)}
              label={t('POSITION_TYPES')}
              size="small"
              multiple
            />
            <FilterCombo
              name="teamIds"
              data={mapListDataToComboOptions(teamsData)}
              label={t('TEAM')}
              size="small"
              multiple
            />
            <FilterCombo
              data={mapCompetitionsListToComboOptions(competitionsData)}
              name="competitionIds"
              label={t('COMPETITIONS')}
              size="small"
              multiple
            />
            <FilteredCompetitonGroups
              competitionGroupsData={groupsComboData}
              competitionsFormValue={values.competitionIds}
              name="competitionGroupIds"
              label={t('COMPETITION_GROUPS')}
              size="small"
              multiple
            />
          </FilterFormContainer>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="hasNote"
                Label={{ label: t('WITH_NOTE') }}
                size="small"
              />
            </FilterCheckboxContainer>
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="hasReport"
                Label={{ label: t('WITH_REPORT') }}
                size="small"
              />
            </FilterCheckboxContainer>
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="hasAnyObservation"
                Label={{ label: t('WITH_OBSERVATION') }}
                size="small"
              />
            </FilterCheckboxContainer>
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isLiked"
                Label={{ label: t('players:LIKED_ONLY') }}
                size="small"
              />
            </FilterCheckboxContainer>
          </Box>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

const averageRatingInRange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value === '') return
  if (+e.target.value > 4) e.target.value = '4'
  else if (+e.target.value < 1) e.target.value = '1'
}

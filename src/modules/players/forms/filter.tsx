import { Box, TextField } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'
import { useRef } from 'react'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import FilteredCompetitionGroups from '@/components/filteredCompetitionGroups/filteredCompetitionGroups'
import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import {
  CompetitionBasicDataDto,
  ICompetitionComboOptions,
} from '@/modules/competitions/types'
import { CountryDto } from '@/modules/countries/types'
import { mapCountriesListToComboOptions } from '@/modules/countries/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { mapPlayerPositionsToComboOptions } from '@/modules/player-positions/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { getFootedComboData } from '../footed-select'
import { PlayersFiltersState } from '../types'

interface IPlayersFilterFormProps {
  countriesData: CountryDto[]
  positionsData: PlayerPositionDto[]
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
  positionsData,
  competitionsData,
  competitionGroupsData,
  filters,
  onFilter,
  onClearFilters,
}: IPlayersFilterFormProps) => {
  const { t } = useTranslation(['common', 'players'])
  const footedComboData = getFootedComboData(t)
  const formRef = useRef<FormikProps<PlayersFiltersState>>(null)

  return (
    <Formik
      innerRef={formRef}
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
            <FilterCombo
              name="positionIds"
              data={mapPlayerPositionsToComboOptions(positionsData)}
              label={t('POSITIONS')}
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
            <FilteredCompetitionGroups
              competitionsFormValues={
                formRef.current?.values
                  .competitionIds as ICompetitionComboOptions[]
              }
              competitionGroupsData={competitionGroupsData}
              competitionsData={competitionsData}
              competitionsMultiple
              groupsMultiple
            />
          </FilterFormContainer>
          <FilterCheckboxContainer>
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="isLiked"
              Label={{ label: t('players:LIKED_ONLY') }}
              size="small"
            />
          </FilterCheckboxContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

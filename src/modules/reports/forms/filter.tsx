import { Box, Grid, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { getObservationTypeComboData } from '@/components/combos-data/observation-type'
import { getRatingRangeComboData } from '@/components/combos-data/rating-range'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerPositionTypeDto } from '@/modules/player-position-types/types'
import { mapPlayerPositionTypesToComboOptions } from '@/modules/player-position-types/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { ReportsFiltersState } from '../types'

interface IReportsFilterFormProps {
  playersData: PlayerBasicDataDto[]
  positionTypesData: PlayerPositionTypeDto[]
  teamsData: TeamBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  filters: ReportsFiltersState
  onFilter: (data: ReportsFiltersState) => void
  onClearFilters: () => void
}

export const ReportsFilterForm = ({
  playersData,
  teamsData,
  positionTypesData,
  competitionsData,
  competitionGroupsData,
  matchesData,
  filters,
  onFilter,
  onClearFilters,
}: IReportsFilterFormProps) => {
  const { t } = useTranslation(['common', 'reports'])
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
            <FilterCombo
              name="playerIds"
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYERS')}
              multiple
              size="small"
              filterBeforeComma
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  name="playerBornAfter"
                  as={TextField}
                  type="number"
                  variant="outlined"
                  fullWidth
                  label={t('BORN_AFTER')}
                  size="small"
                  inputProps={{ min: 1980, max: 2020, pattern: '/d+', step: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="playerBornBefore"
                  as={TextField}
                  type="number"
                  variant="outlined"
                  fullWidth
                  label={t('BORN_BEFORE')}
                  size="small"
                  inputProps={{ min: 1980, max: 2020, pattern: '/d+', step: 1 }}
                />
              </Grid>
            </Grid>
            <FilterCombo
              name="positionTypeIds"
              data={mapPlayerPositionTypesToComboOptions(positionTypesData)}
              label={t('POSITION_TYPES')}
              multiple
              size="small"
            />
            <FilterCombo
              data={mapListDataToComboOptions(teamsData)}
              name="teamIds"
              label={t('TEAMS')}
              multiple
              size="small"
            />
            <FilterCombo
              data={mapMatchesListToComboOptions(matchesData)}
              name="matchIds"
              label={t('MATCHES')}
              multiple
              size="small"
            />
            <FilterCombo
              name="competitionIds"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              multiple
              size="small"
            />
            <FilteredCompetitonGroups
              competitionGroupsData={groupsComboData}
              competitionsFormValues={values.competitionIds}
              name="competitionGroupIds"
              label={t('COMPETITION_GROUPS')}
              size="small"
              multiple
            />
            <FilterCombo
              name="percentageRatingRanges"
              data={getRatingRangeComboData(t)}
              label={t('RATING_RANGE')}
              size="small"
              multiple
            />
            <FilterCombo
              name="observationType"
              data={getObservationTypeComboData(t)}
              label={t('OBSERVATION_TYPE')}
              size="small"
            />
          </FilterFormContainer>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isLiked"
                Label={{ label: t('LIKED_REPORTS') }}
                size="small"
              />
            </FilterCheckboxContainer>
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="onlyLikedTeams"
                Label={{ label: t('LIKED_TEAMS') }}
                size="small"
              />
            </FilterCheckboxContainer>
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="onlyLikedPlayers"
                Label={{ label: t('LIKED_PLAYERS') }}
                size="small"
              />
            </FilterCheckboxContainer>
            <FilterCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="hasVideo"
                Label={{ label: t('reports:WITH_VIDEO_ONLY') }}
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

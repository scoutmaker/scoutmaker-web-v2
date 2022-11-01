import { Grid, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { RatingRangeSelect } from '@/components/rating-range-select/rating-range-select'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { mapPlayerPositionsToComboOptions } from '@/modules/player-positions/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { NotesFiltersState } from '../types'

interface INotesFilterFormProps {
  playersData: PlayerBasicDataDto[]
  positionsData: PlayerPositionDto[]
  teamsData: TeamBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  filters: NotesFiltersState
  onFilter: (data: NotesFiltersState) => void
  onClearFilters: () => void
}

export const NotesFilterForm = ({
  playersData,
  teamsData,
  positionsData,
  competitionsData,
  competitionGroupsData,
  matchesData,
  filters,
  onFilter,
  onClearFilters,
}: INotesFilterFormProps) => {
  const { t } = useTranslation(['common', 'notes'])

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
            <FilterCombo
              name="playerIds"
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYERS')}
              multiple
              size="small"
              filterBeforeComma
            />
            <FilterCombo
              name="positionIds"
              data={mapPlayerPositionsToComboOptions(positionsData)}
              label={t('POSITIONS')}
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
            <RatingRangeSelect
              name="ratingRange"
              label={t('RATING_RANGE')}
              size="small"
            />
          </FilterFormContainer>
          <FilterCheckboxContainer>
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="isLiked"
              Label={{ label: t('notes:LIKED_ONLY') }}
              size="small"
            />
          </FilterCheckboxContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

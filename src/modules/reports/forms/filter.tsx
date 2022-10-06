import { Grid, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Combo } from '@/components/combo/combo'
import { mapGenericNameToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { RatingRangeSelect } from '@/components/rating-range-select/rating-range-select'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { ReportsFiltersState } from '../types'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

interface IReportsFilterFormProps {
  playersData: PlayerBasicDataDto[]
  positionsData: PlayerPositionDto[]
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
  positionsData,
  competitionsData,
  competitionGroupsData,
  matchesData,
  filters,
  onFilter,
  onClearFilters,
}: IReportsFilterFormProps) => {
  const { t } = useTranslation(['common', 'reports'])

  return (
    <Formik
      initialValues={filters}
      onSubmit={data => onFilter(data)}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Container>
            <Combo
              name="playerIds"
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYERS')}
              multiple
              size="small"
            />
            <Combo
              name="positionIds"
              data={mapGenericNameToComboOptions(positionsData)}
              label={t('POSITIONS')}
              multiple
              size="small"
            />
            <Combo
              data={mapGenericNameToComboOptions(teamsData)}
              name="teamIds"
              label={t('TEAMS')}
              multiple
              size="small"
            />
            <Combo
              data={mapMatchesListToComboOptions(matchesData)}
              name="matchIds"
              label={t('MATCHES')}
              multiple
              size="small"
            />
            <Combo
              name="competitionIds"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              multiple
              size="small"
            />
            <Combo
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <StyledCheckboxContainer>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="isLiked"
                    Label={{ label: t('reports:LIKED_ONLY') }}
                    size="small"
                  />
                </StyledCheckboxContainer>
              </Grid>
              <Grid item xs={6}>
                <StyledCheckboxContainer>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="hasVideo"
                    Label={{ label: t('reports:WITH_VIDEO_ONLY') }}
                    size="small"
                  />
                </StyledCheckboxContainer>
              </Grid>
            </Grid>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

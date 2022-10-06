import { Grid, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Combo } from '@/components/combo/combo'
import { mapGenericNameToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { FootedSelect } from '@/modules/players/footed-select'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { PlayersFiltersState } from '../types'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

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
              label={t('NAME_OR_SURNAME')}
              size="small"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>
            <FootedSelect name="footed" label={t('FOOTED')} size="small" />
            <Combo
              name="countryIds"
              data={mapGenericNameToComboOptions(countriesData)}
              label={t('COUNTRIES')}
              size="small"
              multiple
            />
            <Combo
              name="positionIds"
              data={mapGenericNameToComboOptions(positionsData)}
              label={t('POSITIONS')}
              size="small"
              multiple
            />
            <Combo
              name="teamIds"
              data={mapGenericNameToComboOptions(teamsData)}
              label={t('TEAM')}
              size="small"
              multiple
            />
            <Combo
              name="competitionIds"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              size="small"
              multiple
            />
            <Combo
              name="competitionGroupIds"
              data={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              label={t('COMPETITION_GROUPS')}
              size="small"
              multiple
            />
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isLiked"
                Label={{ label: t('players:LIKED_ONLY') }}
                size="small"
              />
            </StyledCheckboxContainer>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

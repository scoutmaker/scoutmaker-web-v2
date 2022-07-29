import { Grid, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { CompetitionGroupsCombo } from '@/components/selects/competition-groups-combo'
import { CompetitionsCombo } from '@/components/selects/competitions-combo'
import { CountriesCombo } from '@/components/selects/countries-combo'
import { FootedSelect } from '@/components/selects/footed-select'
import { PlayersPositionCombo } from '@/components/selects/player-positions-combo'
import { TeamsCombo } from '@/components/selects/teams-combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayersFiltersDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { Container } from '../container'
import { FilterFormActions } from '../filter-form-actions'

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
  filters: PlayersFiltersDto
  onFilter: (data: PlayersFiltersDto) => void
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
            <CountriesCombo
              name="countryIds"
              data={countriesData}
              label={t('COUNTRIES')}
              multiple
            />
            <PlayersPositionCombo
              name="positionIds"
              data={positionsData}
              label={t('POSITIONS')}
              multiple
            />
            <TeamsCombo
              data={teamsData}
              name="teamIds"
              label={t('TEAM')}
              multiple
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
                Label={{ label: t('players:LIKED_ONLY') }}
              />
            </StyledCheckboxContainer>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

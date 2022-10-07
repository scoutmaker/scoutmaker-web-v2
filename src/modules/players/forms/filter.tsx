import { Box, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'
import { PlayersPositionCombo } from '@/modules/player-positions/combo'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { FootedSelect } from '@/modules/players/footed-select'
import { PlayersFiltersDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

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
            <FootedSelect name="footed" label={t('FOOTED')} size="small" />
            <CountriesCombo
              name="countryIds"
              data={countriesData}
              label={t('COUNTRIES')}
              size="small"
              multiple
            />
            <PlayersPositionCombo
              name="positionIds"
              data={positionsData}
              label={t('POSITIONS')}
              size="small"
              multiple
            />
            <TeamsCombo
              data={teamsData}
              name="teamIds"
              label={t('TEAM')}
              size="small"
              multiple
            />
            <CompetitionsCombo
              name="competitionIds"
              data={competitionsData}
              label={t('COMPETITIONS')}
              size="small"
              multiple
            />
            <CompetitionGroupsCombo
              name="competitionGroupIds"
              data={competitionGroupsData}
              label={t('COMPETITION_GROUPS')}
              size="small"
              multiple
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

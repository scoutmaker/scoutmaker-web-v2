import { Grid, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { MatchesCombo } from '@/modules/matches/combo'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { StatusSelect } from '../status-select'
import { OrdersFiltersDto } from '../types'

type IFilterFormProps = {
  filters: OrdersFiltersDto
  onFilter: (data: OrdersFiltersDto) => void
  onClearFilters: () => void
  playersData: PlayerBasicDataDto[]
  teamsData: TeamBasicDataDto[]
  matchesData: MatchBasicDataDto[]
}

export const OrdersFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  playersData,
  teamsData,
  matchesData,
}: IFilterFormProps) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={filters}
      onSubmit={data => onFilter(data)}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <FilterFormContainer>
            <PlayersCombo
              data={playersData}
              name="playerIds"
              label={t('PLAYERS')}
              multiple
              size="small"
            />
            <TeamsCombo
              data={teamsData}
              name="teamIds"
              label={t('TEAMS')}
              multiple
              size="small"
            />
            <MatchesCombo
              data={matchesData}
              name="matchIds"
              label={t('MATCHES')}
              multiple
              size="small"
            />
            <StatusSelect name="status" label={t('STATUS')} size="small" />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  name="createdAfter"
                  as={TextField}
                  type="date"
                  variant="outlined"
                  label={t('orders:CREATED_AFTER')}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="createdBefore"
                  as={TextField}
                  type="date"
                  variant="outlined"
                  label={t('orders:CREATED_BEFORE')}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
          </FilterFormContainer>
          <FilterCheckboxContainer>
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="onlyMine"
              Label={{ label: t('ONLY_MINE') }}
              size="small"
            />
          </FilterCheckboxContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

import { Grid, styled, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { MatchesCombo } from '@/modules/matches/combo'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { StatusSelect } from '../status-select'
import { OrdersFiltersDto } from '../types'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

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
  matchesData
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
          <Container>
            <PlayersCombo
              data={playersData}
              name='playerIds'
              label={t('PLAYERS')}
              multiple
            />
            <TeamsCombo
              data={teamsData}
              name='teamIds'
              label={t('TEAMS')}
              multiple
            />
            <MatchesCombo
              data={matchesData}
              name='matchIds'
              label={t('MATCHES')}
              multiple
            />
            <StatusSelect
              name='status'
              label={t('STATUS')}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  name="createdAfter"
                  as={TextField}
                  type='date'
                  variant="outlined"
                  label={t('orders:CREATED_AFTER')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="createdBefore"
                  as={TextField}
                  type='date'
                  variant="outlined"
                  label={t('orders:CREATED_BEFORE')}
                  fullWidth
                />
              </Grid>
            </Grid>
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="onlyMine"
                Label={{ label: t('ONLY_MINE') }}
              />
            </StyledCheckboxContainer>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

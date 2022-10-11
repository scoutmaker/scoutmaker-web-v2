import { Grid, styled, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { StatusSelect } from '../status-select'
import { OrdersFiltersState } from '../types'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

type IFilterFormProps = {
  filters: OrdersFiltersState
  onFilter: (data: OrdersFiltersState) => void
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
          <Container>
            <FilterCombo
              data={mapPlayersListToComboOptions(playersData)}
              name="playerIds"
              label={t('PLAYERS')}
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
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="onlyMine"
                Label={{ label: t('ONLY_MINE') }}
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

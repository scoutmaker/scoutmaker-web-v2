import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CountriesFiltersDto } from '@/modules/countries/types'
import { MatchesCombo } from '@/modules/matches/combo'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { StatusCombo } from '../status-combo'
import { OrdersFiltersDto } from '../types'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'

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
            <StyledCheckboxContainer>
              <Field component={RadioGroup} name="userId">
                <FormControlLabel
                  value={undefined}
                  control={<Radio />}
                  label={t('ALL')} // ADD_TRANS
                />
                <FormControlLabel
                  value={user.id} // ADD
                  control={<Radio />}
                  label={t('MINE')} // ADD_TRANS
                />
              </Field>
              <PlayersCombo
                data={playersData}
                name='playerIds'
                label={t('PLAYERS')}
                multiple
              />
              <TeamsCombo
                data={teamsData}
                name='teamsIds'
                label={t('TEAMS')}
                multiple
              />
              <MatchesCombo
                data={matchesData}
                name='matchIds'
                label={t('MATCHES')}
                multiple
              />
              <StatusCombo
                name='status'
                label={t('MATCHES')} // ADD_TRANS
              />
              <Field
                name="createdAfter"
                as={TextField}
                type='date'
                variant="outlined"
                label={t('orders:CREATED_AFTER')} // ADD_TRANS
              />
              <Field
                name="createdBefore"
                as={TextField}
                type='date'
                variant="outlined"
                label={t('orders:CREATED_BEFORE')} // ADD_TRANS
              />
            </StyledCheckboxContainer>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

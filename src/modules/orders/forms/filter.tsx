import { FormControlLabel, Radio, styled, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { RadioGroup } from 'formik-mui'
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

const FlexContainer = styled('div')(() => ({
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
  userId: number
}

export const OrdersFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  playersData,
  teamsData,
  matchesData,
  userId
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
            <Field component={RadioGroup} name="userId" >
              <FlexContainer>
                <FormControlLabel
                  value=''
                  control={<Radio />}
                  label={t('ALL')} // ADD_TRANS
                />
                <FormControlLabel
                  value={userId} // ADD
                  control={<Radio />}
                  label={t('MINE')} // ADD_TRANS
                />
              </FlexContainer>
            </Field>
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
              label={t('STATUS')} // ADD_TRANS
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
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

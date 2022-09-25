import { Form, Formik } from 'formik'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { UsersCombo } from '@/modules/users/combo'
import { UserBasicDataDto } from '@/modules/users/types'

import { UserSubscriptionsFiltersDto } from '../types'

interface IFormProps {
  filters: UserSubscriptionsFiltersDto
  onFilter: (data: UserSubscriptionsFiltersDto) => void
  onClearFilters: () => void
  usersData: UserBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const UserSubscriptionsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  competitionGroupsData,
  competitionsData,
  usersData
}: IFormProps) => (
  <Formik
    initialValues={filters}
    onSubmit={data => onFilter(data)}
    enableReinitialize
  >
    {() => (
      <Form autoComplete="off">
        <Container>
          <UsersCombo
            data={usersData}
            name='userId'
          />
          <CompetitionsCombo
            data={competitionsData}
            name='competitionIds'
            multiple
          />
          <CompetitionGroupsCombo
            data={competitionGroupsData}
            name='competitionGroupIds'
            multiple
          />
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Container>
      </Form>
    )}
  </Formik>
)

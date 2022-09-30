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
  usersData,
}: IFormProps) => (
  <Formik
    initialValues={filters}
    onSubmit={data => onFilter(data)}
    enableReinitialize
  >
    {() => (
      <Form autoComplete="off">
        <Container>
          <UsersCombo data={usersData} name="userId" size="small" />
          <CompetitionsCombo
            data={competitionsData}
            name="competitionIds"
            multiple
            size="small"
          />
          <CompetitionGroupsCombo
            data={competitionGroupsData}
            name="competitionGroupIds"
            multiple
            size="small"
          />
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Container>
      </Form>
    )}
  </Formik>
)

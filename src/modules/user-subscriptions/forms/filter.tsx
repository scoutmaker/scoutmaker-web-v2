import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { UserSubscriptionsFiltersState } from '../types'

interface IFormProps {
  filters: UserSubscriptionsFiltersState
  onFilter: (data: UserSubscriptionsFiltersState) => void
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
}: IFormProps) => {
  const { t } = useTranslation()
  return (
    <Formik
      initialValues={filters}
      onSubmit={data => onFilter(data)}
      enableReinitialize
    >
      <Form autoComplete="off">
        <Container>
          <FilterCombo
            data={mapUsersListToComboOptions(usersData)}
            name="userId"
            size="small"
            label={t('USER')}
          />
          <FilterCombo
            data={mapCompetitionsListToComboOptions(competitionsData)}
            name="competitionIds"
            multiple
            size="small"
            label={t('COMPETITIONS')}
          />
          <FilterCombo
            data={mapCompetitionGroupsListToComboOptions(competitionGroupsData)}
            name="competitionGroupIds"
            multiple
            size="small"
            label={t('COMPETITION_GROUPS')}
          />
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Container>
      </Form>
    </Formik>
  )
}

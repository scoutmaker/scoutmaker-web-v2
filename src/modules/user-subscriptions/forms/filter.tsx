import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
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
      onSubmit={(data, form) => {
        onFilter(data)
        form.setSubmitting(false)
      }}
      enableReinitialize
    >
      {({ values }) => (
        <Form autoComplete="off">
          <FilterFormContainer>
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
            <FilteredCompetitonGroups
              competitionGroupsData={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              competitionsFormValue={values.competitionIds}
              name="competitionGroupIds"
              multiple
              size="small"
              label={t('COMPETITION_GROUPS')}
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

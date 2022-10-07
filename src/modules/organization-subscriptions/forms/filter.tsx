import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { OrganizationsCombo } from '@/modules/organizations/combo'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'

import { OrganizationSubscriptionsFiltersDto } from '../types'

interface IFormProps {
  filters: OrganizationSubscriptionsFiltersDto
  onFilter: (data: OrganizationSubscriptionsFiltersDto) => void
  onClearFilters: () => void
  organizationsData: OrganizationBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const OrganizationSubscriptionsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  competitionGroupsData,
  competitionsData,
  organizationsData,
}: IFormProps) => {
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
            <OrganizationsCombo
              data={organizationsData}
              name="organizationId"
              size="small"
            />
            <CompetitionsCombo
              data={competitionsData}
              name="competitionIds"
              multiple
              label={t('COMPETITIONS')}
              size="small"
            />
            <CompetitionGroupsCombo
              data={competitionGroupsData}
              name="competitionGroupIds"
              multiple
              label={t('COMPETITION_GROUPS')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

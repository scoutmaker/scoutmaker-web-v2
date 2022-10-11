import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'

import { OrganizationSubscriptionsFiltersState } from '../types'

interface IFormProps {
  filters: OrganizationSubscriptionsFiltersState
  onFilter: (data: OrganizationSubscriptionsFiltersState) => void
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
          <Container>
            <FilterCombo
              data={mapListDataToComboOptions(organizationsData)}
              name="organizationId"
              size="small"
              label={t('ORGANIZATION')}
            />
            <FilterCombo
              data={mapCompetitionsListToComboOptions(competitionsData)}
              name="competitionIds"
              multiple
              label={t('COMPETITIONS')}
              size="small"
            />
            <FilterCombo
              data={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              name="competitionGroupIds"
              multiple
              label={t('COMPETITION_GROUPS')}
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

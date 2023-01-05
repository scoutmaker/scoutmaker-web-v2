import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { SeasonDto } from '@/modules/seasons/types'
import { mapSeasonsListToComboOptions } from '@/modules/seasons/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CompetitionParticipationsFiltersState } from '../types'

interface IFormProps {
  filters: CompetitionParticipationsFiltersState
  onFilter: (data: CompetitionParticipationsFiltersState) => void
  onClearFilters: () => void
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  groupsData: CompetitionGroupBasicDataDto[]
  seasonsData: SeasonDto[]
}

export const CompetitionParticipationsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  teamsData,
  competitionsData,
  groupsData,
  seasonsData,
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
              name="teamId"
              data={mapListDataToComboOptions(teamsData)}
              label={t('TEAM')}
              size="small"
            />
            <FilterCombo
              name="competitionId"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITION')}
              size="small"
            />
            <FilteredCompetitonGroups
              competitionGroupsData={mapCompetitionGroupsListToComboOptions(
                groupsData,
              )}
              competitionsFormValue={values.competitionId}
              label={t('COMPETITION_GROUP')}
              name="groupId"
              size="small"
            />
            <FilterCombo
              name="seasonId"
              data={mapSeasonsListToComboOptions(seasonsData)}
              label={t('SEASON')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

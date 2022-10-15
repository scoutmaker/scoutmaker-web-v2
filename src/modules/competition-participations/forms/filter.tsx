import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { SeasonDto } from '@/modules/seasons/types'
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
      {() => (
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
            <FilterCombo
              name="groupId"
              data={mapCompetitionGroupsListToComboOptions(groupsData)}
              label={t('COMPETITION_GROUP')}
              size="small"
            />
            <FilterCombo
              name="seasonId"
              data={mapListDataToComboOptions(seasonsData)}
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

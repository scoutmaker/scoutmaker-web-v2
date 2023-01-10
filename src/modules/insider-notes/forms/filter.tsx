import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { PlayerPositionTypeDto } from '@/modules/player-position-types/types'
import { mapPlayerPositionTypesToComboOptions } from '@/modules/player-position-types/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { InsiderNotesFiltersState } from '../types'

interface IFilterFormProps {
  filters: InsiderNotesFiltersState
  onFilter: (data: InsiderNotesFiltersState) => void
  onClearFilters: () => void
  playersData: PlayerBasicDataDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  playerPositionTypesData: PlayerPositionTypeDto[]
}

export const InsiderNotesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  playersData,
  teamsData,
  competitionsData,
  competitionGroupsData,
  playerPositionTypesData,
}: IFilterFormProps) => {
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
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYERS')}
              name="playerIds"
              size="small"
              multiple
              filterBeforeComma
            />
            <FilterCombo
              data={mapPlayerPositionTypesToComboOptions(
                playerPositionTypesData,
              )}
              label={t('POSITION_TYPES')}
              name="positionTypeIds"
              size="small"
              multiple
            />
            <FilterCombo
              data={mapListDataToComboOptions(teamsData)}
              label={t('TEAMS')}
              name="teamIds"
              size="small"
              multiple
            />
            <FilterCombo
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              name="competitionIds"
              size="small"
              multiple
            />
            <FilteredCompetitonGroups
              competitionGroupsData={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              competitionsFormValue={values.competitionIds}
              label={t('COMPETITION_GROUPS')}
              name="competitionGroupIds"
              size="small"
              multiple
            />
          </FilterFormContainer>
          <FilterCheckboxContainer>
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="isLiked"
              Label={{ label: t('ONLY_LIKED') }}
              size="small"
            />
          </FilterCheckboxContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

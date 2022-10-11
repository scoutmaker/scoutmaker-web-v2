import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterCheckboxContainer } from '@/components/forms/filter-checkbox-container'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
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
  playerPositionsData: PlayerPositionDto[]
}

export const InsiderNotesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  playersData,
  teamsData,
  competitionsData,
  competitionGroupsData,
  playerPositionsData,
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
      {() => (
        <Form autoComplete="off">
          <FilterFormContainer>
            <FilterCombo
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYERS')}
              name="playerIds"
              size="small"
              multiple
            />
            <FilterCombo
              data={mapListDataToComboOptions(playerPositionsData)}
              label={t('POSITIONS')}
              name="positionIds"
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
            <FilterCombo
              data={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              label={t('COMPETITION_GROUPS')}
              size="small"
              name="competitionGroupIds"
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

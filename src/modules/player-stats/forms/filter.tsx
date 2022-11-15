import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { PlayerStatsFiltersState } from '../types'

interface IFormProps {
  filters: PlayerStatsFiltersState
  onFilter: (data: PlayerStatsFiltersState) => void
  onClearFilters: () => void
  playersData: PlayerBasicDataDto[]
  teamsData: TeamBasicDataDto[]
  matchesData: MatchBasicDataDto[]
}

export const PlayerStatsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  matchesData,
  playersData,
  teamsData,
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
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYER')}
              name="playerId"
              size="small"
            />
            <FilterCombo
              data={mapListDataToComboOptions(teamsData)}
              label={t('TEAM')}
              name="teamId"
              size="small"
            />
            <FilterCombo
              data={mapMatchesListToComboOptions(matchesData)}
              label={t('MATCH')}
              name="matchId"
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

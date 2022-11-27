import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { TeamAffiliationsFiltersState } from '../types'

interface IFormProps {
  filters: TeamAffiliationsFiltersState
  onFilter: (data: TeamAffiliationsFiltersState) => void
  onClearFilters: () => void
  playersData: PlayerBasicDataDto[]
  teamsData: TeamBasicDataDto[]
}

export const TeamAffiliationFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
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
              name="playerId"
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYER')}
              size="small"
              filterBeforeComma
            />
            <FilterCombo
              name="teamId"
              data={mapListDataToComboOptions(teamsData)}
              label={t('TEAM')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

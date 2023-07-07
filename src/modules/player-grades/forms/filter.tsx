import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'

import { PlayerGradesFiltersState } from '../types'
import { gradesComboOptions } from '../utils'

interface IFilterFormProps {
  filters: PlayerGradesFiltersState
  onFilter: (data: PlayerGradesFiltersState) => void
  playersData: PlayerBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  onClearFilters: () => void
}

export const PlayerGradesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  competitionsData,
  playersData,
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
              name="playerIds"
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYERS')}
              multiple
              size="small"
            />
            <FilterCombo
              name="grades"
              data={gradesComboOptions(t)}
              label={t('GRADES')}
              multiple
              size="small"
            />
            <FilterCombo
              name="competitionIds"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              multiple
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}

import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { TeamAffiliationsFilterDto } from '../types'

interface IFormProps {
  filters: TeamAffiliationsFilterDto
  onFilter: (data: TeamAffiliationsFilterDto) => void
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
            <PlayersCombo
              name="playerId"
              data={playersData}
              label={t('PLAYER')}
              size="small"
            />
            <TeamsCombo
              name="teamId"
              data={teamsData}
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

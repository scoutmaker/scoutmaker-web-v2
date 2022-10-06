import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Combo } from '@/components/combo/combo'
import { mapGenericNameToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
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
      onSubmit={data => onFilter(data)}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Container>
            <Combo
              name="teamId"
              data={mapGenericNameToComboOptions(teamsData)}
              label={t('TEAM')}
              size="small"
            />
            <Combo
              name="competitionId"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITION')}
              size="small"
            />
            <Combo
              name="groupId"
              data={mapCompetitionGroupsListToComboOptions(groupsData)}
              label={t('COMPETITION_GROUP')}
              size="small"
            />
            <Combo
              name="seasonId"
              data={mapGenericNameToComboOptions(seasonsData)}
              label={t('SEASON')}
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

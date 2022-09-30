import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { SeasonsCombo } from '@/modules/seasons/combo'
import { SeasonDto } from '@/modules/seasons/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CompetitionParticipationsFilterDto } from '../types'

interface IFormProps {
  filters: CompetitionParticipationsFilterDto
  onFilter: (data: CompetitionParticipationsFilterDto) => void
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
            <TeamsCombo
              name="teamId"
              data={teamsData}
              label={t('TEAM')}
              size="small"
            />
            <CompetitionsCombo
              name="competitionId"
              data={competitionsData}
              label={t('COMPETITION')}
              size="small"
            />
            <CompetitionGroupsCombo
              name="groupId"
              data={groupsData}
              label={t('COMPETITION_GROUP')}
              size="small"
            />
            <SeasonsCombo
              name="seasonId"
              data={seasonsData}
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

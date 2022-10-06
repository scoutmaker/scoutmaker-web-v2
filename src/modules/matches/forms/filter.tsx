import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Combo } from '@/components/combo/combo'
import { mapGenericNameToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { MatchesFiltersState } from '@/modules/matches/types'
import { SeasonDto } from '@/modules/seasons/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

interface IMatchesFilterFormProps {
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  seasonsData: SeasonDto[]
  filters: MatchesFiltersState
  onFilter: (data: MatchesFiltersState) => void
  onClearFilters: () => void
}

export const MatchesFilterForm = ({
  teamsData,
  competitionsData,
  competitionGroupsData,
  seasonsData,
  filters,
  onFilter,
  onClearFilters,
}: IMatchesFilterFormProps) => {
  const { t } = useTranslation(['common', 'matches'])

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
              data={mapGenericNameToComboOptions(teamsData)}
              name="teamId"
              label={t('TEAM')}
              size="small"
            />
            <Combo
              name="competitionIds"
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              multiple
              size="small"
            />
            <Combo
              name="groupIds"
              data={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              label={t('COMPETITION_GROUPS')}
              multiple
              size="small"
            />
            <Combo
              data={mapGenericNameToComboOptions(seasonsData)}
              name="seasonId"
              label={t('SEASON')}
              size="small"
            />
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="hasVideo"
                Label={{ label: t('matches:WITH_VIDEO_ONLY') }}
                size="small"
              />
            </StyledCheckboxContainer>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

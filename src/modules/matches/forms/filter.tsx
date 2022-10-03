import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { MatchesFiltersDto } from '@/modules/matches/types'
import { SeasonsCombo } from '@/modules/seasons/combo'
import { SeasonDto } from '@/modules/seasons/types'
import { TeamsCombo } from '@/modules/teams/combo'
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
  filters: MatchesFiltersDto
  onFilter: (data: MatchesFiltersDto) => void
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
      onSubmit={(data, form) => {
        onFilter(data)
        form.setSubmitting(false)
      }}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Container>
            <TeamsCombo
              data={teamsData}
              name="teamId"
              label={t('TEAM')}
              size="small"
            />
            <CompetitionsCombo
              name="competitionIds"
              data={competitionsData}
              label={t('COMPETITIONS')}
              multiple
              size="small"
            />
            <CompetitionGroupsCombo
              name="groupIds"
              data={competitionGroupsData}
              label={t('COMPETITION_GROUPS')}
              multiple
              size="small"
            />
            <SeasonsCombo
              data={seasonsData}
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

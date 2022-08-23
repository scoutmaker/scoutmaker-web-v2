import { styled } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { PlayersPositionCombo } from '@/modules/player-positions/combo'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { InsiderNotesFiltersDto } from '../types'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

interface IFilterFormProps {
  filters: InsiderNotesFiltersDto
  onFilter: (data: InsiderNotesFiltersDto) => void
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
  playerPositionsData
}: IFilterFormProps) => {
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
            <PlayersCombo
              data={playersData}
              label={t('PLAYERS')}
              name='playerIds'
              multiple
            />
            <PlayersPositionCombo
              data={playerPositionsData}
              label={t('POSITIONS')}
              name='positionIds'
              multiple
            />
            <TeamsCombo
              data={teamsData}
              label={t('TEAMS')}
              name='teamIds'
              multiple
            />
            <CompetitionsCombo
              data={competitionsData}
              label={t('COMPETITIONS')}
              name='competitionIds'
              multiple
            />
            <CompetitionGroupsCombo
              data={competitionGroupsData}
              label={t('COMPETITION_GROUPS')}
              name='competitionGroupIds'
            />
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isLiked"
                Label={{ label: t('ONLY_LIKED') }}
              />
            </StyledCheckboxContainer>
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

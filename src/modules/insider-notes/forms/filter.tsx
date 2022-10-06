import { styled } from '@mui/material'
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
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { InsiderNotesFiltersState } from '../types'

const StyledCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

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
      onSubmit={data => onFilter(data)}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Container>
            <Combo
              data={mapPlayersListToComboOptions(playersData)}
              label={t('PLAYERS')}
              name="playerIds"
              size="small"
              multiple
            />
            <Combo
              data={mapGenericNameToComboOptions(playerPositionsData)}
              label={t('POSITIONS')}
              name="positionIds"
              size="small"
              multiple
            />
            <Combo
              data={mapGenericNameToComboOptions(teamsData)}
              label={t('TEAMS')}
              name="teamIds"
              size="small"
              multiple
            />
            <Combo
              data={mapCompetitionsListToComboOptions(competitionsData)}
              label={t('COMPETITIONS')}
              name="competitionIds"
              size="small"
              multiple
            />
            <Combo
              data={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              label={t('COMPETITION_GROUPS')}
              size="small"
              name="competitionGroupIds"
              multiple
            />
            <StyledCheckboxContainer>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isLiked"
                Label={{ label: t('ONLY_LIKED') }}
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

import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CreateNoteDto, NoteDto } from '../types'
import { Fields } from './fields'
import {
  generateNoteFormValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface EditNoteFormProps {
  current: NoteDto
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  onSubmit: (data: CreateNoteDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditNoteForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  playersData,
  matchesData,
  positionsData,
  competitionsData,
  competitionGroupsData,
  teamsData,
}: EditNoteFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateNoteFormValidationSchema(t)}
      enableReinitialize
      onSubmit={data => {
        const { rating, ...rest } = data
        const parsedRating =
          typeof rating === 'string' ? parseInt(rating) : rating

        const dataToSubmit = updatedDiff(
          initialValues,
          filter({ ...rest, rating: parsedRating }, (_, value) => value),
        )
        onSubmit(dataToSubmit as CreateNoteDto)
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Fields
              positionsData={positionsData}
              teamsData={teamsData}
              competitionGroupsData={competitionGroupsData}
              competitionsData={competitionsData}
              matchesData={matchesData}
              playersData={playersData}
            />
            <MainFormActions
              label={t('NOTE')}
              isEditState
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: t('CHANGES_CANCELLED'), type: 'warning' })
              }}
            />
          </Container>
        </Form>
      )}
    </Formik>
  )
}

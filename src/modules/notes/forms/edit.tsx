import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'

import { NoteBasicDataDto, NoteDto, UpdateNoteDto } from '../types'
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
  notesData: NoteBasicDataDto[]
  onSubmit: (data: UpdateNoteDto) => void
  onCancelClick?: () => void
  quickMatchId?: string
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
  notesData,
  quickMatchId,
}: EditNoteFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateNoteFormValidationSchema()}
      enableReinitialize
      onSubmit={data => {
        // @ts-ignore to exclude notes edit from submitted data
        const { rating, 'notes-edit-list': notesEdit, ...rest } = data
        const parsedRating =
          typeof rating === 'string' ? parseInt(rating) : rating

        const dataToSubmit = updatedDiff(
          initialValues,
          filter({ ...rest, rating: parsedRating }, (_, value) => value),
        )

        onSubmit(dataToSubmit)
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Fields
              positionsData={positionsData}
              matchesData={matchesData}
              playersData={playersData}
              notesData={notesData}
              matchId={quickMatchId}
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

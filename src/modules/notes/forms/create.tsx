import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { MatchBasicDataDto, MatchDto } from '@/modules/matches/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { ConfirmOnLeaveForm } from '@/utils/hooks/use-confirm-leave'

import { CreateNoteDto, NoteBasicDataDto } from '../types'
import { Fields } from './fields'
import { generateNoteFormValidationSchema, initialValues } from './utils'

interface ICreateNoteFormProps {
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
  notesData: NoteBasicDataDto[]
  onSubmit: (data: CreateNoteDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  match?: MatchDto
  observationType?: 'LIVE' | 'VIDEO'
}

export const CreateNoteForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  playersData,
  matchesData,
  positionsData,
  match,
  observationType,
  notesData,
}: ICreateNoteFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation(['common', 'notes'])
  const initValues = { ...initialValues }

  if (match) initValues.matchId = match.id
  if (observationType) initValues.observationType = observationType

  return (
    <Formik
      initialValues={initValues}
      validationSchema={generateNoteFormValidationSchema()}
      enableReinitialize
      onSubmit={async (data, { resetForm }) => {
        // @ts-ignore to exclude notes edit from submitted data
        const { rating, 'notes-edit-list': notesEdit, ...rest } = data
        const parsedRating =
          typeof rating === 'string' ? parseInt(rating) : rating
        const dataToSubmit = filter(
          { ...rest, rating: parsedRating },
          (_, value) => value,
        )
        onSubmit(dataToSubmit as CreateNoteDto)
        resetForm()
      }}
    >
      {({ handleReset }) => (
        <Form>
          <ConfirmOnLeaveForm />
          <Container fullwidth={fullwidth}>
            <Fields
              positionsData={positionsData}
              matchesData={matchesData}
              playersData={playersData}
              matchDisabled={!!match}
              notesData={notesData}
              matchId={match?.id}
            />
            <MainFormActions
              label={t('NOTE')}
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

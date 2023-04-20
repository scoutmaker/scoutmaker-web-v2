import { Divider } from '@mui/material'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { MatchBasicDataDto, MatchDto } from '@/modules/matches/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { ConfirmOnLeaveForm } from '@/utils/hooks/use-confirm-leave'

import { CreateNoteDto, NoteBasicDataDto } from '../types'
import { mapNotesListToComboOptions } from '../utils'
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
  const router = useRouter()

  if (match) initValues.matchId = match.id
  if (observationType) initValues.observationType = observationType

  return (
    <Formik
      initialValues={initValues}
      validationSchema={generateNoteFormValidationSchema()}
      enableReinitialize
      onSubmit={async (data, { resetForm }) => {
        const { rating, ...rest } = data
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
            {match && (
              <>
                <BasicCombo
                  data={mapNotesListToComboOptions(notesData)}
                  name="notes-edit-list"
                  label={t('notes:EDIT_NOTES_LIST')}
                  onChange={(_, value) => {
                    if (value) router.push(`/notes/edit/${value}`)
                  }}
                />
                <Divider />
              </>
            )}
            <Fields
              positionsData={positionsData}
              matchesData={matchesData}
              playersData={playersData}
              matchDisabled={!!match}
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

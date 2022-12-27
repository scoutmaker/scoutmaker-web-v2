import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { MatchBasicDataDto, MatchDto } from '@/modules/matches/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'

import { CreateNoteDto } from '../types'
import { Fields } from './fields'
import { generateNoteFormValidationSchema, initialValues } from './utils'

interface ICreateNoteFormProps {
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
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
          <Container fullwidth={fullwidth}>
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

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
import { CreatePlayerDto, PlayerBasicDataDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { Fields } from './fields'
import { generateNoteFormValidationSchema, initialValues } from './utils'

interface ICreateNoteFormProps {
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  onSubmit: (data: CreatePlayerDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateNoteForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  playersData,
  matchesData,
  positionsData,
  competitionsData,
  competitionGroupsData,
  teamsData,
}: ICreateNoteFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation(['common', 'notes'])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateNoteFormValidationSchema()}
      enableReinitialize
      onSubmit={async (data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreatePlayerDto)
        resetForm()
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

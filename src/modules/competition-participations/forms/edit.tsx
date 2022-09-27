import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { SeasonsCombo } from '@/modules/seasons/combo'
import { SeasonDto } from '@/modules/seasons/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import {
  CompetitionParticipationDto,
  UpdateCompetitionParticipationDto,
} from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: CompetitionParticipationDto
  onSubmit: (data: UpdateCompetitionParticipationDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  groupsData: CompetitionGroupBasicDataDto[]
  seasonsData: SeasonDto[]
}

export const EditCompetitionParticipationForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  teamsData,
  competitionsData,
  groupsData,
  seasonsData,
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateValidationSchema()}
      enableReinitialize
      onSubmit={data => {
        const dataToSubmit = updatedDiff(
          initialValues,
          filter(data, (_, value) => value),
        )
        onSubmit(dataToSubmit)
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <TeamsCombo
              name="teamId"
              data={teamsData}
              error={touched.teamId && !!errors.teamId}
              helperText={touched.teamId ? errors.teamId : undefined}
              label={t('TEAM')}
            />
            <CompetitionsCombo
              name="competitionId"
              data={competitionsData}
              error={touched.competitionId && !!errors.competitionId}
              helperText={
                touched.competitionId ? errors.competitionId : undefined
              }
              label={t('COMPETITION')}
            />
            <CompetitionGroupsCombo
              name="groupId"
              data={groupsData}
              error={touched.groupId && !!errors.groupId}
              helperText={touched.groupId ? errors.groupId : undefined}
              label={t('COMPETITION_GROUP')}
            />
            <SeasonsCombo
              name="seasonId"
              data={seasonsData}
              error={touched.seasonId && !!errors.seasonId}
              helperText={touched.seasonId ? errors.seasonId : undefined}
              label={t('SEASON')}
            />
            <MainFormActions
              label={t('SEASON')}
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

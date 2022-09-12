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

import { CreateCompetitionParticipationDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateCompetitionParticipationDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  groupsData: CompetitionGroupBasicDataDto[]
  seasonsData: SeasonDto[]
  teamId?: string
}

export const CreateCompetitionParticipationForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  teamsData,
  competitionsData,
  groupsData,
  seasonsData,
  teamId,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initValues = initialValues
  if (teamId) initValues.teamId = teamId

  return (
    <Formik
      initialValues={initValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateCompetitionParticipationDto)
        resetForm()
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
              label={t('COMPETITION_PARTICIPATION')}
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

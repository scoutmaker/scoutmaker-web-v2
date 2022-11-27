import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { MatchDto, UpdateMatchDto } from '@/modules/matches/types'
import { SeasonDto } from '@/modules/seasons/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { Fields } from './fields'
import {
  generateMatchFormValidationSchema,
  getInitialStateFromCurrent,
  initialValues,
} from './utils'

interface ICreateMatchFormProps {
  current: MatchDto
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  seasonsData: SeasonDto[]
  onSubmit: (data: UpdateMatchDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditMatchForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  teamsData,
  competitionsData,
  competitionGroupsData,
  seasonsData,
}: ICreateMatchFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={getInitialStateFromCurrent(current)}
      validationSchema={generateMatchFormValidationSchema(t)}
      enableReinitialize
      onSubmit={data => {
        const dataToSubmit = updatedDiff(
          initialValues,
          filter(data, (_, value) => value),
        )
        onSubmit(dataToSubmit)
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Fields
              {...{
                teamsData,
                competitionsData,
                competitionGroupsData,
                seasonsData,
              }}
            />
            <MainFormActions
              label={t('MATCH')}
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

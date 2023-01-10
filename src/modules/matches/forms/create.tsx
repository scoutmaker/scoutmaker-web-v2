import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { CreateMatchDto } from '@/modules/matches/types'
import { SeasonDto } from '@/modules/seasons/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { Fields } from './fields'
import { generateMatchFormValidationSchema, initialValues } from './utils'

interface ICreateMatchFormProps {
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  seasonsData: SeasonDto[]
  onSubmit: (data: CreateMatchDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateMatchForm = ({
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
      initialValues={initialValues}
      validationSchema={generateMatchFormValidationSchema(t)}
      enableReinitialize
      onSubmit={async (data, { resetForm }) => {
        const dataToSubmit = filter(
          data,
          (_, value) => typeof value === 'number' || value,
        )
        onSubmit(dataToSubmit as CreateMatchDto)
        resetForm()
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

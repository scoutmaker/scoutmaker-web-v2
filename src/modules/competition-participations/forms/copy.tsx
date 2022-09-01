import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CopyCompetitionParticipationsDto } from '@/modules/competition-participations/types'

import { SeasonsCombo } from '../../seasons/combo'
import { SeasonDto } from '../../seasons/types'
import { generateCopyValidationSchema } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CopyCompetitionParticipationsDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  fromSeasonId?: number
  seasonsData: SeasonDto[]
}

export const CopyParticipationsForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  fromSeasonId,
  seasonsData
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues: CopyCompetitionParticipationsDto = { toSeasonId: 0, fromSeasonId: 0 }
  if (fromSeasonId)
    initialValues.fromSeasonId = fromSeasonId

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCopyValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CopyCompetitionParticipationsDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <SeasonsCombo
              name='fromSeasonId'
              data={seasonsData}
              label={t('comp-participations:COPY_FROM')}
              error={touched.fromSeasonId && !!errors.fromSeasonId}
              helperText={touched.fromSeasonId ? errors.fromSeasonId : undefined}
            />
            <SeasonsCombo
              name='toSeasonId'
              data={seasonsData}
              label={t('comp-participations:COPY_TO')}
              error={touched.toSeasonId && !!errors.toSeasonId}
              helperText={touched.toSeasonId ? errors.toSeasonId : undefined}
            />
            <MainFormActions
              label={t('comp-participations:COPY_OF_SEASON')}
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

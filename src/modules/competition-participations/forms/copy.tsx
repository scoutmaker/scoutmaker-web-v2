import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CopyCompetitionParticipationsDto } from '@/modules/competition-participations/types'

import { SeasonDto } from '../../seasons/types'
import { generateCopyValidationSchema } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CopyCompetitionParticipationsDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  fromSeasonId?: string
  seasonsData: SeasonDto[]
}

export const CopyParticipationsForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  fromSeasonId,
  seasonsData,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues: CopyCompetitionParticipationsDto = {
    toSeasonId: '',
    fromSeasonId: '',
  }

  if (fromSeasonId) initialValues.fromSeasonId = fromSeasonId

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
            <BasicCombo
              name="fromSeasonId"
              data={mapListDataToComboOptions(seasonsData)}
              label={t('comp-participations:COPY_FROM')}
              error={touched.fromSeasonId && !!errors.fromSeasonId}
              helperText={
                touched.fromSeasonId ? errors.fromSeasonId : undefined
              }
            />
            <BasicCombo
              name="toSeasonId"
              data={mapListDataToComboOptions(seasonsData)}
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

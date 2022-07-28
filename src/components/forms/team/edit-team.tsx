import { TextField } from '@mui/material'
import { updatedDiff } from 'deep-object-diff'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ClubBasicDataDto } from '@/modules/clubs/types'
import { TeamDto, UpdateTeamDto } from '@/types/teams'

import { ClubsCombo } from '../../selects/clubs-combo'
import { Container } from '../container'
import { MainFormActions } from '../main-form-actions'
import {
  generateUpdateTeamValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditTeamFormProps {
  current: TeamDto
  clubsData: ClubBasicDataDto[]
  onSubmit: (data: UpdateTeamDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const EditTeamForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  clubsData,
}: IEditTeamFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateTeamValidationSchema()}
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
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <ClubsCombo
              data={clubsData}
              name="clubId"
              label={t('CLUB')}
              error={touched.clubId && !!errors.clubId}
              helperText={touched.clubId ? errors.clubId : undefined}
            />
            <Field
              name="minut90url"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('90_MINUT_URL')}
              error={touched.minut90url && !!errors.minut90url}
              helperText={touched.minut90url && errors.minut90url}
            />
            <Field
              name="transfermarktUrl"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('TRANSFERMARKT_URL')}
              error={touched.transfermarktUrl && !!errors.transfermarktUrl}
              helperText={touched.transfermarktUrl && errors.transfermarktUrl}
            />
            <Field
              name="lnpId"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('LNP_ID')}
              error={touched.lnpId && !!errors.lnpId}
              helperText={touched.lnpId && errors.lnpId}
            />
            <MainFormActions
              label={t('TEAM')}
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

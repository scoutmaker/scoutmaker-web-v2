import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ClubsCombo } from '@/modules/clubs/combo'
import { ClubBasicDataDto } from '@/modules/clubs/types'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { CreateTeamDto } from '@/modules/teams/types'

import { generateCreateTeamValidationSchema, initialValues } from './utils'

interface ICreateTeamFormProps {
  clubsData: ClubBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  onSubmit: (data: CreateTeamDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
}

export const CreateTeamForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  clubsData,
  competitionGroupsData,
  competitionsData,
}: ICreateTeamFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateTeamValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateTeamDto)
        resetForm()
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
            <CompetitionsCombo
              data={competitionsData}
              name="competitionId"
              label={t('COMPETITION')}
              error={touched.competitionId && !!errors.competitionId}
              helperText={
                touched.competitionId ? errors.competitionId : undefined
              }
            />
            <CompetitionGroupsCombo
              data={competitionGroupsData}
              name="groupId"
              label={t('COMPETITION_GROUP')}
              error={touched.groupId && !!errors.groupId}
              helperText={touched.groupId ? errors.groupId : undefined}
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
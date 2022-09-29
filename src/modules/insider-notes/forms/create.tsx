import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { ExpandMoreIcon } from '@/components/icons'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { AccordionInnerContainer } from '@/modules/notes/forms/fields'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CreateInsiderNoteDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface IFormProps {
  onSubmit: (data: CreateInsiderNoteDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  playersData: PlayerBasicDataDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const CreateInsiderNoteForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  playersData,
  teamsData,
  competitionsData,
  competitionGroupsData,
}: IFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateInsiderNoteDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Field
              name="description"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('DESCRIPTION')}
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <Field
              name="informant"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('INFORMANT')}
              error={touched.informant && !!errors.informant}
              helperText={touched.informant && errors.informant}
            />
            <PlayersCombo
              data={playersData}
              name="playerId"
              label={t('PLAYER')}
              error={touched.playerId && !!errors.playerId}
              helperText={touched.playerId ? errors.playerId : undefined}
            />

            <Accordion sx={{ background: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="meta-data-fields-content"
                id="meta-data-fields-header"
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  {t('META_DATA')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AccordionInnerContainer>
                  <Typography>
                    {t('insider-notes:META_DATA_DISCLAIMER')}
                  </Typography>
                  <TeamsCombo
                    data={teamsData}
                    name="teamId"
                    label={t('TEAM')}
                    error={touched.teamId && !!errors.teamId}
                    helperText={touched.teamId ? errors.teamId : undefined}
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
                    name="competitionGroupId"
                    label={t('COMPETITION_GROUP')}
                    error={
                      touched.competitionGroupId && !!errors.competitionGroupId
                    }
                    helperText={
                      touched.competitionGroupId
                        ? errors.competitionGroupId
                        : undefined
                    }
                  />
                </AccordionInnerContainer>
              </AccordionDetails>
            </Accordion>
            <MainFormActions
              label={t('INSIDER_NOTE')}
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

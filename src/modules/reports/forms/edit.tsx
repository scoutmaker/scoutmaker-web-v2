import {
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  TextField,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { getObservationTypeComboData } from '@/components/combos-data/observation-type'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import {
  formatUpdateReportDto,
  generateEditReportFormValidationSchema,
  getInitialStateFromCurrent,
} from '@/modules/reports/forms/utils'
import { ReportDto, UpdateReportDto } from '@/modules/reports/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { BasicDetailsCard } from './components/basic-details-card'
import { MetaStep } from './components/meta-step'
import { SkillAssessmentsCard } from './components/skill-assessments-card'
import { StatsStep } from './components/stats-step'
import { SummaryCard } from './components/summary-card'
import { VideoCard } from './components/video-card'

interface IEditReportFormProps {
  current: ReportDto
  onSubmit: (data: UpdateReportDto) => void
  onCancelClick?: () => void
  positionsData: PlayerPositionDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
}

export const EditReportForm = ({
  current,
  onSubmit,
  onCancelClick,
  positionsData,
  teamsData,
  competitionsData,
  competitionGroupsData,
  matchesData,
  playersData,
}: IEditReportFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation(['common', 'reports'])

  const initialValues = getInitialStateFromCurrent(current)
  return (
    <>
      <BasicDetailsCard report={current} />
      <Formik
        initialValues={initialValues}
        validationSchema={generateEditReportFormValidationSchema()}
        enableReinitialize
        onSubmit={data =>
          onSubmit(formatUpdateReportDto({ data, initialValues }))
        }
      >
        {({ handleReset, touched, errors }) => (
          <Form>
            <MarginBox>
              <Card>
                <CardHeader title={t('reports:BASIC_INFO')} />
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <BasicCombo
                    data={mapMatchesListToComboOptions(matchesData)}
                    name="matchId"
                    label={t('MATCH')}
                    error={touched.matchId && !!errors.matchId}
                    helperText={touched.matchId ? errors.matchId : undefined}
                  />
                  <BasicCombo
                    data={getObservationTypeComboData(t)}
                    name="observationType"
                    label={t('OBSERVATION_TYPE')}
                    error={touched.observationType && !!errors.observationType}
                    helperText={
                      touched.observationType
                        ? errors.observationType
                        : undefined
                    }
                  />
                  <BasicCombo
                    data={mapPlayersListToComboOptions(playersData)}
                    name="playerId"
                    label={t('PLAYER')}
                    error={touched.playerId && !!errors.playerId}
                    helperText={touched.playerId ? errors.playerId : undefined}
                    filterBeforeComma
                  />
                  <Field
                    name="shirtNo"
                    as={TextField}
                    type="number"
                    inputProps={{ min: 1, max: 99 }}
                    variant="outlined"
                    fullWidth
                    label={t('SHIRT_NO')}
                    error={touched.shirtNo && !!errors.shirtNo}
                    helperText={touched.shirtNo && errors.shirtNo}
                  />
                </CardContent>
              </Card>
            </MarginBox>
            <MarginBox>
              <VideoCard />
            </MarginBox>
            <MarginBox>
              <SummaryCard />
            </MarginBox>
            <MarginBox>
              <SkillAssessmentsCard
                skills={current.skills}
                maxRatingScore={current.maxRatingScore}
              />
            </MarginBox>
            <MarginBox>
              <Card>
                <CardHeader title={t('reports:EDIT_STATS_CARD')} />
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <StatsStep />
                </CardContent>
              </Card>
            </MarginBox>
            <MarginBox>
              <Card>
                <CardHeader title={t('reports:EDIT_META_CARD')} />
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <MetaStep
                    teamsData={teamsData}
                    positionsData={positionsData}
                    competitionsData={competitionsData}
                    competitionGroupsData={competitionGroupsData}
                  />
                </CardContent>
              </Card>
            </MarginBox>
            <MainFormActions
              label={t('REPORT')}
              isEditState
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: t('CHANGES_CANCELLED'), type: 'warning' })
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  )
}

const MarginBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}))

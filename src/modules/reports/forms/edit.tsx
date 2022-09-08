import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
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
}

export const EditReportForm = ({
  current,
  onSubmit,
  onCancelClick,
  positionsData,
  teamsData,
  competitionsData,
  competitionGroupsData,
}: IEditReportFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

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
        {({ handleReset }) => (
          <Form>
            <Box sx={{ my: 2 }}>
              <VideoCard />
            </Box>
            <Box sx={{ my: 2 }}>
              <SummaryCard />
            </Box>
            <Box sx={{ my: 2 }}>
              <SkillAssessmentsCard
                skills={current.skills}
                maxRatingScore={current.template.maxRatingScore}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Card>
                <CardHeader title={t('reports:EDIT_STATS_CARD')} />
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <StatsStep />
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ my: 2 }}>
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
            </Box>
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

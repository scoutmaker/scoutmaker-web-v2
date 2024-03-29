import { Box, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { ReportTemplateBasicDataDto } from '@/modules/report-templates/types'
import { ConfirmOnLeaveForm } from '@/utils/hooks/use-confirm-leave'
import { useStepper } from '@/utils/hooks/use-stepper'

import { CreateReportDto, IReportFromNoteQuery, ReportType } from '../types'
import { MatchStep } from './components/match-step'
import { OrderStep } from './components/order-step'
import { PlayerStep } from './components/player-step'
import { ReportTypeStep } from './components/report-type-step'
import { SkillAssessmentsStep } from './components/skill-assessments-step'
import { StatsStep } from './components/stats-step'
import { StepActions } from './components/step-actions'
import { SummaryStep } from './components/summary-step'
import { TemplateStep } from './components/template-step'
import {
  createReportFormInitialValues,
  formatCreateReportDto,
  generateCreateReportFormValidationSchema,
  getStepError,
  TStep,
} from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateReportDto) => void
  onCancelClick?: () => void
  templatesData: ReportTemplateBasicDataDto[]
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
  isOrderOptionDisabled?: boolean
  templateId: string
}

export const CreateReportForm = ({
  onSubmit,
  onCancelClick,
  matchesData,
  playersData,
  templatesData,
  isOrderOptionDisabled,
  templateId,
  positionsData,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation(['common', 'reports'])
  const { activeStep, handleNext, handleBack } = useStepper()
  const router = useRouter()
  const formInitialValues = { ...createReportFormInitialValues }

  // TODO: handle this
  const activeOrderId = 0

  const [reportType, setReportType] = useState<ReportType>(
    activeOrderId ? 'order' : 'custom',
  )

  const queryDataFields: Array<keyof IReportFromNoteQuery> = [
    'playerId',
    'matchId',
    'shirtNo',
    'finalRating',
    'summary',
  ]
  queryDataFields.forEach(query => {
    const data = router.query[query] as string | undefined

    if (query === 'shirtNo' && data) formInitialValues[query] = +data
    else if (data) formInitialValues[query] = data as never
  })

  if (templateId) formInitialValues.templateId = templateId

  const steps: TStep[] = [
    {
      title: t('reports:REPORT_TEMPLATE_STEP_TITLE'),
      errorKeys: ['templateId'],
      content:
        templatesData.length > 0 ? (
          <TemplateStep templatesData={templatesData} />
        ) : (
          <p>{t('reports:PICK_REPORT_TEMPLATE')}</p>
        ),
    },
    {
      title: t('reports:REPORT_TYPE_STEP_TITLE'),
      content: (
        <ReportTypeStep
          reportType={reportType}
          setReportType={setReportType}
          isOrderOptionDisabled={isOrderOptionDisabled}
          // isPlayerOptionDisabled={!!activeOrderId}
        />
      ),
    },
    {
      title:
        reportType === 'custom'
          ? t('reports:PLAYER_INFO_STEP_TITLE')
          : t('reports:ORDER_PLAYER_INFO_STEP_TITLE'),
      errorKeys: ['playerId', 'shirtNo'],
      content:
        reportType === 'order' ? (
          <OrderStep />
        ) : (
          <PlayerStep playersData={playersData} positionsData={positionsData} />
        ),
    },
    {
      title: t('reports:MATCH_STEP_TITLE'),
      content: <MatchStep matchesData={matchesData} />,
      errorKeys: ['matchId', 'videoUrl', 'videoDescription'],
    },
    {
      title: t('reports:SUMMARY_STEP_TITLE'),
      content: <SummaryStep />,
      errorKeys: ['finalRating', 'summary'],
    },
    {
      title: t('reports:SKILL_ASSESSMENTS_STEP_TITLE'),
      content: <SkillAssessmentsStep />,
    },
    {
      title: t('reports:STATS_STEP_TITLE'),
      content: <StatsStep />,
      errorKeys: [
        'minutesPlayed',
        'goals',
        'assists',
        'yellowCards',
        'redCards',
      ],
    },
  ]

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={generateCreateReportFormValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(formatCreateReportDto(data))
        resetForm()
      }}
    >
      {({ handleReset, touched, errors, values }) => (
        <Form>
          <ConfirmOnLeaveForm />
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ bgcolor: 'background.paper', px: 2, py: 1, borderRadius: 2 }}
          >
            {steps.map(step => (
              <Step key={step.title}>
                <StepLabel error={getStepError({ errors, touched, step })}>
                  {step.title}
                </StepLabel>
                <StepContent>
                  <Box sx={{ mt: 1 }}>{step.content}</Box>
                  <StepActions
                    activeStep={activeStep}
                    totalSteps={steps.length}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isNextButtonDisabled={
                      !values.templateId || (activeStep > 1 && !values.playerId)
                    }
                  />
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2 }}>
            <MainFormActions
              label={t('REPORT')}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: t('CHANGES_CANCELLED'), type: 'warning' })
              }}
            />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

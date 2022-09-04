import { Box, Grid } from '@mui/material'
import { updatedDiff } from 'deep-object-diff'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import {
  generateReportFormValidationSchema,
  getInitialStateFromCurrent,
} from '@/modules/reports/forms/utils'
import { ReportDto, UpdateReportDto } from '@/modules/reports/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { BasicDetailsCard } from './components/basic-details-card'
import { SummaryCard } from './components/summary-card'
import { VideoCard } from './components/video-card'

interface IEditReportFormProps {
  current: ReportDto
  onSubmit: (data: UpdateReportDto) => void
  onCancelClick?: () => void
}

export const EditReportForm = ({
  current,
  onSubmit,
  onCancelClick,
}: IEditReportFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <>
      <BasicDetailsCard report={current} />
      <Formik
        initialValues={initialValues}
        validationSchema={generateReportFormValidationSchema(t)}
        enableReinitialize
        onSubmit={data => {
          // const { rating, ...rest } = data
          // const parsedRating =
          //   typeof rating === 'string' ? parseInt(rating) : rating

          // const dataToSubmit = updatedDiff(
          //   initialValues,
          //   filter({ ...rest, rating: parsedRating }, (_, value) => value),
          // )
          onSubmit(data)
        }}
      >
        {({ handleReset }) => (
          <Form>
            <Box sx={{ my: 2 }}>
              <VideoCard />
            </Box>
            <Box sx={{ my: 2 }}>
              <SummaryCard />
            </Box>
            <MainFormActions
              label={t('NOTE')}
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

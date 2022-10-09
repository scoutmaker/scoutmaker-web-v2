import { Button } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'

import { MatchesCombo } from '../../matches/combo'
import { MatchBasicDataDto } from '../../matches/types'
import { MatchAttendanceDto } from '../types'
import { generateValidationSchema, getInitialStateFromCurrent } from './utils'

interface ICreateCountryFormProps {
  onSubmit: (data: { matchId: string }) => void
  onLeaveMatchClick: () => void
  fullwidth?: boolean
  matchesData: MatchBasicDataDto[]
  activeMatch: MatchAttendanceDto | null | undefined
}

export const GoToMatchForm = ({
  onSubmit,
  onLeaveMatchClick,
  fullwidth,
  matchesData,
  activeMatch,
}: ICreateCountryFormProps) => {
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(activeMatch)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateValidationSchema(t)}
      enableReinitialize
      onSubmit={data => onSubmit(data)}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <MatchesCombo
              data={matchesData}
              name="matchId"
              label={t('MATCH')}
              error={touched.matchId && !!errors.matchId}
              helperText={touched.matchId ? errors.matchId : undefined}
              disabled={!!activeMatch}
            />
            {!activeMatch ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {t('GO_TO_MATCH')}
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  onLeaveMatchClick()
                  handleReset()
                }}
              >
                {t('LEAVE_MATCH')}
              </Button>
            )}
          </Container>
        </Form>
      )}
    </Formik>
  )
}

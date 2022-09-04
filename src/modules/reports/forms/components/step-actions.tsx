import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface IStepActionsProps {
  activeStep: number
  totalSteps: number
  handleBack: () => void
  handleNext: () => void
  isNextButtonDisabled: boolean
}

export const StepActions = ({
  activeStep,
  totalSteps,
  handleBack,
  handleNext,
  isNextButtonDisabled,
}: IStepActionsProps) => {
  const { t } = useTranslation()
  const isLastStep = activeStep === totalSteps - 1

  return (
    <div>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ marginTop: 1, marginRight: 1 }}
      >
        {t('BACK')}
      </Button>
      {isLastStep ? null : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{ marginTop: 1, marginRight: 1 }}
          disabled={isNextButtonDisabled}
        >
          {t('FORWARD')}
        </Button>
      )}
    </div>
  )
}

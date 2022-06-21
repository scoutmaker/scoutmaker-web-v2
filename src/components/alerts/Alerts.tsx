import { Slide, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAlertsState } from '../../context/alerts/useAlertsState'

const StyledContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: '50%',
  width: '50%',
  transform: 'translateX(-50%)',
  zIndex: 5000,
}))

const StyledAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

export const Alerts = () => {
  const { alerts } = useAlertsState()

  return (
    <StyledContainer>
      {alerts.length > 0
        ? alerts.map(alert => {
            const { id, isVisible, msg, type } = alert

            return (
              <Slide
                key={id}
                in={isVisible}
                direction="down"
                mountOnEnter
                unmountOnExit
              >
                <StyledAlert severity={type} variant="filled">
                  {msg}
                </StyledAlert>
              </Slide>
            )
          })
        : null}
    </StyledContainer>
  )
}

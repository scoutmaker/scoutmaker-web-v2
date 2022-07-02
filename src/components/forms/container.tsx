import { styled } from '@mui/material/styles'

interface IContainerProps {
  fullWidth?: boolean
}

export const Container = styled('div')<IContainerProps>(
  ({ theme, fullWidth }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 'auto', 2),
    gap: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },

    width: fullWidth ? '100%' : 'auto',
  }),
)

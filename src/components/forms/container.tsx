import { styled } from '@mui/material/styles'

interface IContainerProps {
  fullwidth?: boolean
}

export const Container = styled('div')<IContainerProps>(
  ({ theme, fullwidth }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 'auto', 2),
    gap: theme.spacing(2),

    width: fullwidth ? '100%' : 'auto',

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  }),
)

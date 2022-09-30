import { styled } from '@mui/material/styles'

interface IContainerProps {
  fullwidth?: boolean
}

export const Container = styled('div')<IContainerProps>(
  ({ theme, fullwidth }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    '& > div': {
      flex: '1 0 320px',
    },

    [theme.breakpoints.up(1640)]: {
      '& > div': {
        flex: '1 0 400px',
      },
    },
    width: fullwidth ? '100%' : 'auto',
  }),
)

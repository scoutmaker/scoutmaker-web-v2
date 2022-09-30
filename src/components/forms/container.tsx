import { styled } from '@mui/material/styles'

interface IContainerProps {
  fullwidth?: boolean
}

export const Container = styled('div')<IContainerProps>(
  ({ theme, fullwidth }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    maxWidth: 1550,
    '& > div': {
      flex: '1 0 500px',
    },

    [theme.breakpoints.down('sm')]: {
      '& > div': {
        flex: '1 0 200px',
      },
    },
    width: fullwidth ? '100%' : 'auto',
  }),
)

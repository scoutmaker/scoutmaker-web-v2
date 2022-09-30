import { styled } from '@mui/material/styles'

interface IContainerProps {
  fullwidth?: boolean
}

export const Container = styled('div')<IContainerProps>(
  ({ theme, fullwidth }) => ({
    display: 'grid',
    margin: theme.spacing(0, 'auto', 2),
    gap: theme.spacing(2),

    // [theme.breakpoints.up('sm')]: {
    //   width: '50%',
    // },

    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    },

    width: fullwidth ? '100%' : 'auto',
  }),
)

import { styled } from '@mui/material'

import logo from '../../../public/logo-white.png'

export const Header = () => (
  <Container>
    <Logo src={logo.src} alt="Scoutmaker logo" />
  </Container>
)

const Container = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(3),
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 2,

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}))

const Logo = styled('img')(({ theme }) => ({
  width: 160,

  [theme.breakpoints.down('md')]: {
    width: 100,
  },
}))

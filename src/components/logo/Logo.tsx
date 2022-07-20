import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

import logoWhite from '../../../public/logo-white.png'

const StyledContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const StyledImageContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 1, 1, 0),
  width: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const Logo = () => (
  <StyledContainer>
    <StyledImageContainer>
      <Image src={logoWhite} alt="PlaymakerPro Logo" objectFit="cover" />
    </StyledImageContainer>
    <Typography variant="h5" noWrap component="h1">
      ScoutMaker Pro
    </Typography>
  </StyledContainer>
)
